import { ResumeData, Recommendation } from '../types';
import { MOCK_RECOMMENDATIONS, MOCK_RESUME } from '../constants';

// Simulate a delay to mimic API processing time
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const processResume = async (file: File | string): Promise<{ resume: ResumeData; recommendations: Recommendation[] }> => {
  await delay(2500); // 2.5 seconds simulated processing time

  // In a real app, we would use FormData and fetch() here
  // const formData = new FormData();
  // formData.append('resume', file);
  // const response = await fetch('/api/recommend', { method: 'POST', body: formData });
  // return response.json();

  // For this demo, we return the mock data tailored for Ashiritha S
  return {
    resume: MOCK_RESUME,
    recommendations: MOCK_RECOMMENDATIONS
  };
};