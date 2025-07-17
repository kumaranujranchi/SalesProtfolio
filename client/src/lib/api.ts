const API_BASE = process.env.NODE_ENV === 'production' 
  ? '/.netlify/functions' 
  : '/api';

export async function apiRequest(method: string, endpoint: string, data?: any) {
  const url = `${API_BASE}${endpoint}`;
  
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || 'Request failed');
  }

  return response;
}