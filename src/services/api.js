const BASE_URL = 'http://localhost:4000/api';

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
    if (error.name === 'TypeError') {
      throw new Error('Unable to connect to the backend. Please ensure localhost:4000 is running.');
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
