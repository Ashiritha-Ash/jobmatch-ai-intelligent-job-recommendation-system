import React from 'react';
import { Loader2, BrainCircuit, CheckCircle } from 'lucide-react';

interface LoadingStateProps {
  progress: number;
}

const LoadingState: React.FC<LoadingStateProps> = ({ progress }) => {
  const steps = [
    { id: 1, label: "Parsing resume content", threshold: 10, done: 30 },
    { id: 2, label: "Extracting skills & experience", threshold: 30, done: 60 },
    { id: 3, label: "Generating semantic embeddings", threshold: 60, done: 85 },
    { id: 4, label: "Ranking top job matches", threshold: 85, done: 100 }
  ];

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-8 w-full max-w-lg mx-auto px-4">
      {/* Central Icon */}
      <div className="relative mb-4">
        <div className="absolute inset-0 bg-indigo-100 rounded-full animate-ping opacity-75 duration-1000"></div>
        <div className="relative bg-white p-6 rounded-full shadow-xl border border-indigo-50 z-10">
          <BrainCircuit className="w-12 h-12 text-indigo-600 animate-pulse" />
          <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full border-2 border-white">
            AI
          </div>
        </div>
      </div>

      <div className="w-full space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900">Analyzing Profile</h3>
          <p className="text-gray-500 mt-2">Our AI is reading your resume to find the perfect match.</p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium text-gray-700">
            <span>Processing...</span>
            <span className="text-indigo-600">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite] border-t border-white/10"></div>
            </div>
          </div>
        </div>
        
        {/* Steps Pipeline */}
        <div className="relative mt-8 space-y-0">
           {/* Vertical connector line */}
          <div className="absolute left-5 top-4 bottom-4 w-0.5 bg-gray-100 -z-10"></div>
          
          {steps.map((step, index) => {
            const isCompleted = progress >= step.done;
            const isActive = progress >= step.threshold && progress < step.done;
            
            return (
              <div key={step.id} className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-500 ${isActive ? 'bg-white shadow-sm border border-gray-100 scale-105' : 'opacity-80'}`}>
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                  isCompleted ? 'bg-green-50 border-green-500 text-green-500' : 
                  isActive ? 'bg-indigo-50 border-indigo-500 text-indigo-600' : 
                  'bg-white border-gray-200 text-gray-300'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : isActive ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                  )}
                </div>
                
                <div className="flex-grow">
                  <p className={`text-sm font-medium transition-colors ${
                    isCompleted ? 'text-gray-900' : 
                    isActive ? 'text-indigo-700 font-semibold' : 
                    'text-gray-400'
                  }`}>
                    {step.label}
                  </p>
                  {isActive && (
                    <p className="text-xs text-indigo-500 mt-0.5 animate-pulse">Working on it...</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LoadingState;