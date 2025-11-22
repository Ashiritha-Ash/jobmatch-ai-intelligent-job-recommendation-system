import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, ClipboardType, ArrowRight } from 'lucide-react';

interface UploadZoneProps {
  onUpload: (file: File | string) => void;
}

const UploadZone: React.FC<UploadZoneProps> = ({ onUpload }) => {
  const [activeTab, setActiveTab] = useState<'file' | 'text'>('file');
  const [textInput, setTextInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  const handleTextSubmit = () => {
    if (textInput.trim().length > 20) {
      onUpload(textInput);
    }
  };

  const handleDemoClick = () => {
    // Simulate uploading a file named "Ashiritha S-Resume.pdf"
    const demoFile = new File(["demo content"], "Ashiritha S-Resume.pdf", { type: "application/pdf" });
    onUpload(demoFile);
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
      <div className="bg-indigo-600 px-6 py-8 text-center">
        <h2 className="text-3xl font-extrabold text-white">Find Your Perfect Job</h2>
        <p className="mt-2 text-indigo-100 text-lg">Upload your resume to get AI-ranked recommendations instantly.</p>
      </div>

      <div className="p-1">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('file')}
            className={`flex-1 py-4 text-sm font-medium text-center transition-colors duration-200 ${
              activeTab === 'file' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <UploadCloud className="w-4 h-4" />
              Upload PDF/DOCX
            </div>
          </button>
          <button
            onClick={() => setActiveTab('text')}
            className={`flex-1 py-4 text-sm font-medium text-center transition-colors duration-200 ${
              activeTab === 'text' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <ClipboardType className="w-4 h-4" />
              Paste Text
            </div>
          </button>
        </div>

        <div className="p-8">
          {activeTab === 'file' ? (
            <div className="space-y-6">
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="bg-indigo-100 p-4 rounded-full mb-4 group-hover:bg-indigo-200 transition-colors">
                  <FileText className="w-8 h-8 text-indigo-600" />
                </div>
                <p className="text-gray-700 font-medium mb-1">Click to upload or drag and drop</p>
                <p className="text-gray-500 text-sm">PDF, DOCX or TXT (MAX. 5MB)</p>
                <input 
                  type="file" 
                  className="hidden" 
                  ref={fileInputRef} 
                  accept=".pdf,.docx,.txt" 
                  onChange={handleFileChange}
                />
              </div>
              
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase font-semibold">Or try demo</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <button 
                onClick={handleDemoClick}
                className="w-full bg-white border border-indigo-200 text-indigo-700 py-3 px-4 rounded-lg font-medium hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2"
              >
                <span>Use Sample Resume (Ashiritha S)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <textarea 
                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-sm text-gray-700"
                placeholder="Paste your resume content here..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
              ></textarea>
              <button 
                onClick={handleTextSubmit}
                disabled={textInput.trim().length < 20}
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                Analyze Resume
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadZone;