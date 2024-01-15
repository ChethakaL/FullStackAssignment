// apiService.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
});

export const loginUser = async (username, password) => {
  try {
    const response = await api.post('/user/login', { username, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};
