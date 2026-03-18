// API Configuration
// Use relative URL when served from Django, absolute URL for development
const isDevelopment = import.meta.env.DEV;
export const API_BASE_URL = isDevelopment
  ? (import.meta.env.VITE_API_URL || 'http://localhost:8000/api')
  : '/api';

export const API_ENDPOINTS = {
  news: `${API_BASE_URL}/news/`,
  events: `${API_BASE_URL}/events/`,
  galleries: `${API_BASE_URL}/galleries/`,
  sectors: `${API_BASE_URL}/sectors/`,
  projects: `${API_BASE_URL}/projects/`,
  faqs: `${API_BASE_URL}/faqs/`,
  kebeles: `${API_BASE_URL}/kebeles/`,
  adminMessage: `${API_BASE_URL}/admin-messages/`,
  globalSettings: `${API_BASE_URL}/global-settings/`,
  services: `${API_BASE_URL}/services/`,
};

// Helper to get full image URL
export function getImageUrl(imagePath: string | null): string {
  if (!imagePath) return '/placeholder.jpg';
  
  // Django API returns full URLs, so return as-is
  return imagePath;
}
