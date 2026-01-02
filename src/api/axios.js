import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://applyflow-backend-8edy.onrender.com/api'
  baseURL: `${import.meta.env.VITE_API_URL}/api`
});

const getTokenByRole = () => {
  const path = window.location.pathname;

  if (path.startsWith('/admin')) return localStorage.getItem('admin_token');
  if (path.startsWith('/recruiter')) return localStorage.getItem('recruiter_token');
  return localStorage.getItem('student_token');
};

api.interceptors.request.use(config => {
  const token = getTokenByRole();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
