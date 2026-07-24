// Use Vite environment variable `VITE_API_URL` for production builds.
// Local development fallback: http://localhost:4000
const rawApiRoot = import.meta.env.VITE_API_URL || 'http://localhost:4000';
// Normalize: if the provided URL already contains `/api` keep it, otherwise append `/api`
const API_ROOT = rawApiRoot.replace(/\/$/, '');
const BASE_URL = API_ROOT.endsWith('/api') ? API_ROOT : `${API_ROOT}/api`;

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const error = new Error('Server error');
      error.status = response.status;
      try {
        error.details = await response.json();
      } catch {
        error.details = null;
      }
      throw error;
    }
    return await response.json();
  } catch (error) {
    // Network-level failures often show up as TypeError when fetch can't reach the host
    if (error.name === 'TypeError') {
      // Provide a helpful message that references the configured API root rather than hardcoded localhost.
      throw new Error(`Unable to connect to the backend at ${API_ROOT}. Check that the API is running and that the frontend VITE_API_URL is correctly set.`);
    }
    throw error;
  }
}

export async function fetchReports() {
  return request('/reports');
}

export async function fetchReportById(id) {
  return request(`/reports/${id}`);
}

export async function createReport(payload) {
  return request('/reports', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export async function upvoteReport(id) {
  return request(`/reports/${id}/upvote`, { method: 'POST' });
}
