import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import UploadZone from './components/UploadZone';
import LoadingState from './components/LoadingState';
import ResultsView from './components/ResultsView';
import { AppState, ResumeData, Recommendation } from './types';
import { processResume } from './services/apiService';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.UPLOAD);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [progress, setProgress] = useState(0);
  
  // Use a ref to safely clear interval
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const cleanupProgressInterval = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  const handleUpload = async (input: File | string) => {
    setAppState(AppState.PROCESSING);
    setProgress(0);
    
    // Start simulated progress
    // We want to simulate a process that takes roughly 2.5s but hangs a bit at "stages"
    // defined in LoadingState (30%, 60%, 85%)
    progressIntervalRef.current = setInterval(() => {
      setProgress(prev => {
        // Stage 1: Parsing (0-30) - Fast
        if (prev < 30) {
            return prev + 2;
        }
        // Stage 2: Extracting (30-60) - Medium
        if (prev < 60) {
            return prev + 1;
        }
        // Stage 3: Embeddings (60-85) - Slower
        if (prev < 85) {
            return prev + 0.5;
        }
        // Stage 4: Ranking (85-95) - Crawl until API returns
        if (prev < 95) {
            return prev + 0.2;
        }
        return prev;
      });
    }, 50);

    try {
      const { resume, recommendations } = await processResume(input);
      
      cleanupProgressInterval();
      setProgress(100);
      
      // Small delay to show 100% completion before switching views
      setTimeout(() => {
        setResumeData(resume);
        setRecommendations(recommendations.sort((a, b) => b.score - a.score));
        setAppState(AppState.RESULTS);
      }, 800);

    } catch (error) {
      console.error("Processing error", error);
      cleanupProgressInterval();
      setAppState(AppState.ERROR);
      setTimeout(() => setAppState(AppState.UPLOAD), 3000);
    }
  };

  const handleReset = () => {
    setResumeData(null);
    setRecommendations([]);
    setProgress(0);
    setAppState(AppState.UPLOAD);
  };

  useEffect(() => {
    return () => cleanupProgressInterval();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
      <Navbar />
      
      <main className="flex-grow">
        {appState === AppState.UPLOAD && (
          <div className="py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[80vh]">
             <UploadZone onUpload={handleUpload} />
             <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3 max-w-4xl w-full px-4">
                <div className="text-center group">
                   <div className="bg-white w-14 h-14 mx-auto rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 mb-4 text-indigo-600 font-bold text-xl group-hover:scale-110 transition-transform duration-300">1</div>
                   <h3 className="font-bold text-gray-900">Upload Resume</h3>
                   <p className="text-sm text-gray-500 mt-2 leading-relaxed">Drag & drop your PDF or paste text directly. We handle the parsing.</p>
                </div>
                <div className="text-center group">
                   <div className="bg-white w-14 h-14 mx-auto rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 mb-4 text-indigo-600 font-bold text-xl group-hover:scale-110 transition-transform duration-300">2</div>
                   <h3 className="font-bold text-gray-900">AI Matching</h3>
                   <p className="text-sm text-gray-500 mt-2 leading-relaxed">Our advanced model extracts skills and computes semantic similarity.</p>
                </div>
                <div className="text-center group">
                   <div className="bg-white w-14 h-14 mx-auto rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 mb-4 text-indigo-600 font-bold text-xl group-hover:scale-110 transition-transform duration-300">3</div>
                   <h3 className="font-bold text-gray-900">Get Hired</h3>
                   <p className="text-sm text-gray-500 mt-2 leading-relaxed">View top ranked jobs, analysis charts, and apply directly.</p>
                </div>
             </div>
          </div>
        )}

        {appState === AppState.PROCESSING && (
          <div className="min-h-[80vh] flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm">
            <LoadingState progress={progress} />
          </div>
        )}

        {appState === AppState.RESULTS && resumeData && (
          <ResultsView 
            resume={resumeData} 
            recommendations={recommendations} 
            onReset={handleReset} 
          />
        )}

        {appState === AppState.ERROR && (
           <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
              <div className="bg-red-50 p-6 rounded-full mb-6 animate-bounce">
                 <span className="text-4xl">⚠️</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Something went wrong</h2>
              <p className="text-gray-600 mt-2 mb-8">We couldn't parse your resume. Please check the file and try again.</p>
              <button 
                onClick={() => setAppState(AppState.UPLOAD)}
                className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Try Again
              </button>
           </div>
        )}
      </main>
    </div>
  );
};

export default App;