import React, { useState } from 'react';
import { Recommendation } from '../types';
import { MapPin, Building, Clock, ChevronDown, ChevronUp, Check, AlertTriangle, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface JobCardProps {
  recommendation: Recommendation;
  rank: number;
}

const JobCard: React.FC<JobCardProps> = ({ recommendation, rank }) => {
  const [expanded, setExpanded] = useState(false);
  const { job, score, match_details } = recommendation;

  const scorePercentage = Math.round(score * 100);
  
  // Color coding for score
  let scoreColor = 'bg-green-500';
  let scoreText = 'text-green-600';
  if (scorePercentage < 70) { scoreColor = 'bg-yellow-500'; scoreText = 'text-yellow-600'; }
  if (scorePercentage < 50) { scoreColor = 'bg-red-500'; scoreText = 'text-red-600'; }

  const chartData = [
    { name: 'Semantic', value: Math.round(match_details.semantic_similarity * 100) },
    { name: 'Skills', value: Math.round(match_details.skill_overlap_ratio * 100) },
  ];

  return (
    <div className={`bg-white rounded-lg shadow-sm border transition-all duration-200 overflow-hidden ${expanded ? 'ring-2 ring-indigo-500 border-transparent' : 'border-gray-200 hover:border-indigo-300'}`}>
      {/* Header Section */}
      <div className="p-6 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-4">
            <div className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-16 bg-gray-50 rounded-lg border border-gray-100">
              <span className="text-2xl font-bold text-gray-700">#{rank}</span>
              <span className="text-[10px] uppercase text-gray-400 font-semibold">Rank</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 hover:text-indigo-600 transition-colors">{job.title}</h3>
              <div className="flex items-center gap-2 mt-1 text-gray-600">
                <Building className="w-4 h-4" />
                <span className="text-sm font-medium">{job.company}</span>
              </div>
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {job.location}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {job.posted_date}
                </div>
                {job.salary_range && (
                  <div className="flex items-center gap-1 text-gray-700 font-medium">
                    <DollarSign className="w-3 h-3" /> {job.salary_range}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Score Circle */}
          <div className="flex items-center gap-6">
             <div className="hidden sm:block text-right">
                <div className="text-xs text-gray-500 uppercase font-semibold">Match Score</div>
                <div className={`text-2xl font-bold ${scoreText}`}>{scorePercentage}%</div>
             </div>
             <button className="text-gray-400 hover:text-indigo-600">
               {expanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
             </button>
          </div>
        </div>
        
        {/* Quick Badges */}
        {!expanded && (
          <div className="mt-4 flex flex-wrap gap-2">
            {match_details.matched_skills.slice(0, 4).map(skill => (
              <span key={skill} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <Check className="w-3 h-3 mr-1" /> {skill}
              </span>
            ))}
            {match_details.missing_skills.length > 0 && (
               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                 + {match_details.missing_skills.length} missing skills
               </span>
            )}
          </div>
        )}
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="border-t border-gray-100 bg-gray-50 p-6 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left: Description & Match Logic */}
            <div className="lg:col-span-2 space-y-6">
               <div>
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">Why this job?</h4>
                  <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded border border-blue-100 italic">
                    "{match_details.reasoning}"
                  </p>
               </div>
               
               <div>
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">Skills Analysis</h4>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {match_details.matched_skills.map(skill => (
                      <span key={skill} className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                        <Check className="w-3 h-3 mr-1.5" /> {skill}
                      </span>
                    ))}
                    {match_details.missing_skills.map(skill => (
                      <span key={skill} className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-red-50 text-red-800 border border-red-100">
                        <AlertTriangle className="w-3 h-3 mr-1.5" /> {skill}
                      </span>
                    ))}
                  </div>
               </div>

               <div>
                 <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">Job Description</h4>
                 <p className="text-sm text-gray-600 leading-relaxed">{job.description}</p>
               </div>
            </div>

            {/* Right: Metrics & Actions */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-xs font-bold text-gray-500 uppercase mb-4 text-center">Match Metrics</h4>
                <div className="h-40 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <XAxis dataKey="name" tick={{fontSize: 12}} />
                      <YAxis hide domain={[0, 100]} />
                      <Tooltip cursor={{fill: 'transparent'}} />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={30}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? '#4f46e5' : '#10b981'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                 <div className="text-xs font-bold text-gray-500 uppercase mb-2">Experience Level</div>
                 <div className={`text-sm font-medium px-2 py-1 rounded text-center ${
                    match_details.experience_match === 'perfect' ? 'bg-green-100 text-green-800' : 
                    match_details.experience_match === 'underqualified' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                 }`}>
                   {match_details.experience_match.charAt(0).toUpperCase() + match_details.experience_match.slice(1)} Match
                 </div>
                 <div className="mt-2 text-xs text-gray-500 text-center">
                    Required: {job.min_experience_years} years
                 </div>
              </div>

              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition-colors">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCard;