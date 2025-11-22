import React from 'react';
import { Briefcase, FileText } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center text-indigo-600">
              <Briefcase className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold tracking-tight text-gray-900">JobMatch AI</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <span className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Resume Matcher
              </span>
              <span className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer">
                Jobs Database
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <button className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>API Docs</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;