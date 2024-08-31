import axios from "axios";

export const api = axios.create({ baseURL: "http://localhost:3333" });

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
)

api.interceptors.response.use(
  res => res,
  error => {
    if (error.response.status === 401) {
      localStorage.removeItem('userToken');
    }
    return Promise.reject(error);
  }
);