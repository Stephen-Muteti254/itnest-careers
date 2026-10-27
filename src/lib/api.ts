import axios from 'axios';

const API_BASE_URL =
  // import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api/v1';
  import.meta.env.VITE_API_URL || 'https://itnest-bkd.onrender.com/api/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // IMPORTANT FIX
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Clear tokens on unauthorized
      localStorage.removeItem("access_token");
      sessionStorage.removeItem("access_token");
    }
    return Promise.reject(error);
  }
);

export default api;