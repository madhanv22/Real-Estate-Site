import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('pf_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto logout on 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('pf_token');
      localStorage.removeItem('pf_user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

// ── PUBLIC ───────────────────────────────────────────────────────────────
export const fetchProperties = (params) =>
  api.get('/properties', { params }).then((r) => r.data);

export const fetchProperty = (id) =>
  api.get(`/properties/${id}`).then((r) => r.data);

export const fetchAgent = (id) =>
  api.get(`/agents/${id}`).then((r) => r.data);

export const fetchTestimonials = () =>
  api.get('/testimonials').then((r) => r.data);

export const submitLead = (data) =>
  api.post('/leads', data).then((r) => r.data);

// ── AUTH ─────────────────────────────────────────────────────────────────
export const login = (data) =>
  api.post('/auth/login', data).then((r) => r.data);

export const getMe = () =>
  api.get('/auth/me').then((r) => r.data);

// ── ADMIN ─────────────────────────────────────────────────────────────────
export const fetchAdminStats = () =>
  api.get('/admin/stats').then((r) => r.data);

export const fetchAdminProperties = () =>
  api.get('/admin/properties').then((r) => r.data);

export const createProperty = (data) =>
  api.post('/admin/properties', data).then((r) => r.data);

export const updateProperty = (id, data) =>
  api.put(`/admin/properties/${id}`, data).then((r) => r.data);

export const deleteProperty = (id) =>
  api.delete(`/admin/properties/${id}`).then((r) => r.data);

export const fetchAdminAgents = () =>
  api.get('/admin/agents').then((r) => r.data);

export const createAgent = (data) =>
  api.post('/admin/agents', data).then((r) => r.data);

export const updateAgent = (id, data) =>
  api.put(`/admin/agents/${id}`, data).then((r) => r.data);

export const fetchAdminLeads = () =>
  api.get('/admin/leads').then((r) => r.data);

export const updateLeadStatus = (id, status) =>
  api.put(`/admin/leads/${id}/status`, { status }).then((r) => r.data);

export const fetchAdminProfile = () =>
  api.get('/admin/profile').then((r) => r.data);

export const updateAdminProfile = (data) =>
  api.put('/admin/profile', data).then((r) => r.data);

// ── SUPER ADMIN ───────────────────────────────────────────────────────────
export const fetchSuperStats = () =>
  api.get('/superadmin/stats').then((r) => r.data);

export const fetchUsers = () =>
  api.get('/superadmin/users').then((r) => r.data);

export const createUser = (data) =>
  api.post('/superadmin/users', data).then((r) => r.data);

export const updateUser = (id, data) =>
  api.put(`/superadmin/users/${id}`, data).then((r) => r.data);

export const deleteUser = (id) =>
  api.delete(`/superadmin/users/${id}`).then((r) => r.data);

export const fetchAllLeads = () =>
  api.get('/superadmin/leads').then((r) => r.data);

export const fetchAllProperties = () =>
  api.get('/superadmin/properties').then((r) => r.data);

export default api;
