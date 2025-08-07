import axios from "axios";
import { toast } from "react-toastify"; // Toastify import

const api = axios.create({
  baseURL: import.meta.env.VITE_API || "http://localhost:5000/api",
  withCredentials: true
});

// ✅ Success/Error interceptors
api.interceptors.response.use(
  (response) => {
    // Agar tum har successful API pe toast dikhana chah rahi ho:
    // toast.success("Request successful");
    return response;
  },
  (error) => {
    // Error toast
    const message = error?.response?.data?.message || "Something went wrong!";
    toast.error(message);
    return Promise.reject(error);
  }
);

export default api;
