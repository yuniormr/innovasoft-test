import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { storage } from "../utils/storage";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// Request interceptor — attach Bearer token automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = storage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor — handle 401 globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      storage.clearSession();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
