import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.100.9:3331',
});

export default api;
