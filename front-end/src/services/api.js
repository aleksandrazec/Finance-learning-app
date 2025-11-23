import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9013',
  withCredentials: true, 
});

export default api
