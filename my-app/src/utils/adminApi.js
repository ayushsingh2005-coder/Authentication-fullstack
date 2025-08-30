// API calls for admin operations
import axios from 'axios';

// Create axios instance for admin API
const adminApi = axios.create({
  baseURL: 'http://localhost:5000/api/admin', // Adjust to your backend URL
});

// Add auth token to all requests
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      window.location.href = '/admin';
    }
    return Promise.reject(error);
  }
);

// Auth functions
export const adminLogin = async (credentials) => {
  const response = await adminApi.post('/login', credentials);
  return response.data;
};

// Dashboard functions
export const getAdminStats = async () => {
  const response = await adminApi.get('/dashboard');
  return response.data;
};

// Post management functions
export const getAllPosts = async (filters = {}) => {
  const params = new URLSearchParams();
  Object.keys(filters).forEach(key => {
    if (filters[key]) params.append(key, filters[key]);
  });
  
  const response = await adminApi.get(`/posts?${params}`);                                      
  return response.data;
};

export const updatePostStatus = async (postId, action, reason = '') => {
  const response = await adminApi.put(`/posts/${postId}/status`, { action, reason });
  return response.data;
};

export const bulkUpdatePosts = async (postIds, action, reason = '') => {
  const response = await adminApi.put('/posts/bulk-update', { postIds, action, reason });
  return response.data;
};

// User management functions
export const getAllUsers = async (filters = {}) => {
  const params = new URLSearchParams();
  Object.keys(filters).forEach(key => {
    if (filters[key]) params.append(key, filters[key]);
  });
  
  const response = await adminApi.get(`/users?${params}`);
  return response.data;
};

export const updateUserRole = async (userId, role, permissions = []) => {
  const response = await adminApi.put(`/users/${userId}/role`, { role, permissions });
  return response.data;
};

// Logout function
export const adminLogout = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUser');
  window.location.href = '/admin'; // redirect to admin login
};


export default adminApi;