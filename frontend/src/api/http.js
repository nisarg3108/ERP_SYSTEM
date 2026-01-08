import { getToken, removeToken } from '../store/auth.store';

const API_BASE_URL = 'http://localhost:5000/api';

export const authFetch = async (endpoint, options = {}) => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (response.status === 401) {
    removeToken();
    window.location.href = '/';
    throw new Error('Unauthorized');
  }

  return response.json();
};
