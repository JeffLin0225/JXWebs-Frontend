import axiosapi from 'axios';

const instance = axiosapi.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000
});

export default instance;
