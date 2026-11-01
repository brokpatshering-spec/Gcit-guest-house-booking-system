import axios from 'axios';
const api = axios.create({
baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4001/api',
});
// Automatically inject JWT Bearer Token into headers
api.interceptors.request.use((config) => {
const token = localStorage.getItem('token');
if (token) {
 config.headers.Authorization = `Bearer ${token}`;
}
return config;
}, (error) => {
return Promise.reject(error);
});
export default api;
