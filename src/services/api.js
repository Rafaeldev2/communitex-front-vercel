// /src/services/api.js
import axios from 'axios';

// Criamos uma instância do axios com a URL base do seu backend
const api = axios.create({
  baseURL: 'http://localhost:8080', // Conforme definido no seu swagger.json
});

/**
 * Interceptor para adicionar o token JWT em todas as requisições
 * quando ele estiver disponível.
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;