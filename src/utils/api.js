import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const signup = (data) => axios.post(`${API_URL}/auth/signup`, data);
export const login = (data) => axios.post(`${API_URL}/auth/login`, data);

export const getItems = (token) =>
  axios.get(`${API_URL}/items`, { headers: { Authorization: `Bearer ${token}` } });

export const createItem = (data, token) =>
  axios.post(`${API_URL}/items`, data, { headers: { Authorization: `Bearer ${token}` } });

export const updateItem = (id, data, token) =>
  axios.put(`${API_URL}/items/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });

export const deleteItem = (id, token) =>
  axios.delete(`${API_URL}/items/${id}`, { headers: { Authorization: `Bearer ${token}` } });
