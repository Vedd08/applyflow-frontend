import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`
});

/* ================= TOKEN BY ROLE ================= */
const getTokenByRole = () => {
  const path = window.location.pathname;

  if (path.startsWith('/admin')) return localStorage.getItem('token');
  if (path.startsWith('/recruiter')) return localStorage.getItem('token');
  if (path.startsWith('/student')) return localStorage.getItem('token');

  return localStorage.getItem('token');
};

/* ================= INTERCEPTOR ================= */
api.interceptors.request.use(
  (config) => {
    const token = getTokenByRole();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
