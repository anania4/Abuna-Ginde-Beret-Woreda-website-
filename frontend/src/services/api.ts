import { API_ENDPOINTS } from '../config';

// Generic fetch function with error handling
async function fetchAPI<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
}

// Paginated response type from Django
interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// News API
export async function fetchNews() {
  const data = await fetchAPI<PaginatedResponse<any>>(API_ENDPOINTS.news);
  return data.results || data;
}

export async function fetchNewsById(id: string) {
  const url = `${API_ENDPOINTS.news}${id}/`;
  return await fetchAPI<any>(url);
}

// Events API
export async function fetchEvents() {
  const data = await fetchAPI<PaginatedResponse<any>>(API_ENDPOINTS.events);
  return data.results || data;
}

export async function fetchEventById(id: string) {
  const url = `${API_ENDPOINTS.events}${id}/`;
  return await fetchAPI<any>(url);
}

// Galleries API
export async function fetchGalleries() {
  const data = await fetchAPI<PaginatedResponse<any>>(API_ENDPOINTS.galleries);
  return data.results || data;
}

// Sectors API
export async function fetchSectors() {
  const data = await fetchAPI<PaginatedResponse<any>>(API_ENDPOINTS.sectors);
  return data.results || data;
}

export async function fetchSectorById(id: string) {
  const url = `${API_ENDPOINTS.sectors}${id}/`;
  return await fetchAPI<any>(url);
}

// Projects API
export async function fetchProjects() {
  const data = await fetchAPI<PaginatedResponse<any>>(API_ENDPOINTS.projects);
  return data.results || data;
}

// FAQs API
export async function fetchFAQs() {
  const data = await fetchAPI<PaginatedResponse<any>>(API_ENDPOINTS.faqs);
  return data.results || data;
}

// Kebeles API
export async function fetchKebeles() {
  const data = await fetchAPI<PaginatedResponse<any>>(API_ENDPOINTS.kebeles);
  return data.results || data;
}

// Admin Message API (singleton)
export async function fetchAdminMessage() {
  const data = await fetchAPI<PaginatedResponse<any>>(API_ENDPOINTS.adminMessage);
  const results = data.results || data;
  return Array.isArray(results) ? results[0] : results;
}

// Global Settings API (singleton)
export async function fetchGlobalSettings() {
  const data = await fetchAPI<PaginatedResponse<any>>(API_ENDPOINTS.globalSettings);
  const results = data.results || data;
  return Array.isArray(results) ? results[0] : results;
}

// Services API
export async function fetchServices() {
  const data = await fetchAPI<PaginatedResponse<any>>(API_ENDPOINTS.services);
  return data.results || data;
}

export async function fetchServiceById(id: string) {
  const url = `${API_ENDPOINTS.services}${id}/`;
  return await fetchAPI<any>(url);
}
