import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  headers: { 'Content-Type': 'application/json' }
});


// Example endpoints
export const fetchItems   = () => api.get('/items');
export const createItem   = data => api.post('/items', data);
export const fetchItem    = id   => api.get(`/items/${id}`);
export const updateItem   = (id, data) => api.put(`/items/${id}`, data);
export const deleteItem   = id   => api.delete(`/items/${id}`);

export default api;
