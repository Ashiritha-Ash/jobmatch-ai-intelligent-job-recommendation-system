import { Job, ResumeData, Recommendation } from './types';

export const MOCK_JOBS: Job[] = [
  {
    job_id: '101',
    title: 'Senior Frontend Engineer',
    company: 'TechFlow Systems',
    location: 'San Francisco, CA (Remote)',
    description: 'We are looking for a React expert to lead our UI team. Experience with TypeScript and Tailwind is a must.',
    required_skills: ['React', 'TypeScript', 'Tailwind CSS', 'Redux', 'System Design'],
    min_experience_years: 5,
    salary_range: '$160k - $210k',
    posted_date: '2 days ago'
  },
  {
    job_id: '102',
    title: 'Full Stack Developer (Python/React)',
    company: 'DataDriven AI',
    location: 'New York, NY',
    description: 'Join our fast-paced team building AI tools. You will work with Flask APIs and React frontends.',
    required_skills: ['Python', 'Flask', 'React', 'PostgreSQL', 'Docker', 'AWS'],
    min_experience_years: 3,
    salary_range: '$130k - $170k',
    posted_date: '1 week ago'
  },
  {
    job_id: '103',
    title: 'Machine Learning Engineer',
    company: 'NeuroSync',
    location: 'Austin, TX',
    description: 'Develop NLP models for resume parsing. Experience with transformers and scikit-learn required.',
    required_skills: ['Python', 'PyTorch', 'NLP', 'scikit-learn', 'MLOps'],
    min_experience_years: 4,
    salary_range: '$150k - $190k',
    posted_date: '3 days ago'
  },
  {
    job_id: '104',
    title: 'Junior Web Developer',
    company: 'StartUp Inc',
    location: 'Remote',
    description: 'Great opportunity for a junior dev to learn React and Node.js.',
    required_skills: ['JavaScript', 'HTML', 'CSS', 'React'],
    min_experience_years: 1,
    salary_range: '$70k - $90k',
    posted_date: '5 hours ago'
  },
  {
    job_id: '105',
    title: 'DevOps Engineer',
    company: 'CloudScale',
    location: 'Seattle, WA',
    description: 'Manage our K8s clusters and CI/CD pipelines.',
    required_skills: ['Kubernetes', 'Docker', 'Jenkins', 'Terraform', 'Python'],
    min_experience_years: 4,
    salary_range: '$140k - $180k',
    posted_date: '4 days ago'
  }
];

export const MOCK_RESUME: ResumeData = {
  name: 'Ashiritha S',
  email: 'ashiritha.s@example.com',
  phone: '+1 (555) 123-4567',
  skills: ['Python', 'React', 'Flask', 'SQL', 'Machine Learning', 'Data Analysis', 'JavaScript', 'HTML/CSS'],
  experience_years: 3,
  education: ['B.Tech in Computer Science'],
  summary: 'Full stack developer with a passion for AI integration. Experienced in building scalable web applications using Python and React.'
};

// This simulates the backend logic for the "Ashiritha S-Resume.pdf"
export const MOCK_RECOMMENDATIONS: Recommendation[] = [
  {
    job: MOCK_JOBS[1], // Full Stack
    score: 0.92,
    match_details: {
      skill_overlap_ratio: 0.83,
      semantic_similarity: 0.95,
      matched_skills: ['Python', 'Flask', 'React', 'PostgreSQL'],
      missing_skills: ['Docker', 'AWS'],
      experience_match: 'perfect',
      reasoning: 'Strong match for both Frontend (React) and Backend (Python/Flask) skills. Experience level aligns perfectly.'
    }
  },
  {
    job: MOCK_JOBS[2], // ML Engineer
    score: 0.78,
    match_details: {
      skill_overlap_ratio: 0.60,
      semantic_similarity: 0.85,
      matched_skills: ['Python', 'NLP', 'scikit-learn'],
      missing_skills: ['PyTorch', 'MLOps'],
      experience_match: 'underqualified',
      reasoning: 'Good potential due to Python and ML background, but missing specific MLOps experience.'
    }
  },
  {
    job: MOCK_JOBS[0], // Senior Frontend
    score: 0.65,
    match_details: {
      skill_overlap_ratio: 0.40,
      semantic_similarity: 0.70,
      matched_skills: ['React', 'JavaScript'],
      missing_skills: ['TypeScript', 'Redux', 'System Design'],
      experience_match: 'underqualified',
      reasoning: 'Candidate has React experience but lacks Senior-level requirements like System Design and TypeScript.'
    }
  },
  {
    job: MOCK_JOBS[3], // Junior Web Dev
    score: 0.55,
    match_details: {
      skill_overlap_ratio: 1.0,
      semantic_similarity: 0.50,
      matched_skills: ['JavaScript', 'HTML', 'CSS', 'React'],
      missing_skills: [],
      experience_match: 'overqualified',
      reasoning: 'Candidate is likely overqualified for this role based on 3+ years of Full Stack experience.'
    }
  }
];