export interface Skill {
  name: string;
  level?: string; // e.g., "Expert", "Intermediate"
  category?: 'technical' | 'soft' | 'tool';
}

export interface Job {
  job_id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  required_skills: string[];
  min_experience_years: number;
  salary_range?: string;
  posted_date: string;
}

export interface Recommendation {
  job: Job;
  score: number; // 0 to 1
  match_details: {
    skill_overlap_ratio: number;
    semantic_similarity: number;
    matched_skills: string[];
    missing_skills: string[];
    experience_match: 'perfect' | 'underqualified' | 'overqualified';
    reasoning: string;
  };
}

export interface ResumeData {
  name: string;
  email: string;
  phone?: string;
  skills: string[];
  experience_years: number;
  education: string[];
  summary: string;
  raw_text?: string;
}

export enum AppState {
  UPLOAD = 'UPLOAD',
  PROCESSING = 'PROCESSING',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR'
}