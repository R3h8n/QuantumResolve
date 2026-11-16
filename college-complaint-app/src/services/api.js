import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiLogin = (email, password, role) => API.post('/login', { email, password, role });
export const apiRegister = (studentData) => API.post('/register', studentData);
export const apiGetComplaints = () => API.get('/complaints');
export const apiCreateComplaint = (data) => API.post('/complaints', data);
export const apiAdminUpdate = (id, data) => API.put(`/complaints/${id}/admin`, data);
export const apiDeptUpdate = (id, data) => API.put(`/complaints/${id}/department`, data);

export default API;