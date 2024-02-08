// api.ts
import axios, { AxiosInstance } from 'axios';

// api.ts
const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Ajusta según tu configuración
  headers: {
    'Content-Type': 'application/json',
  },
});


export default apiClient;
