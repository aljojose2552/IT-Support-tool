import axios from "axios";
import { store } from "../redux/store";
import { logout } from "../redux/auth/authSlice";

const BASE_URL = "http://localhost:3000/api";

const getToken = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const token = localStorage.getItem("token");
      resolve(token);
    }, 1000);
  });
};

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequset = axios.create({
  baseURL: BASE_URL,
});

userRequset.interceptors.request.use(async (config) => {
  const token = await getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

userRequset.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error?.response?.data?.message;

    if (errorMessage === "jwt expired") {
      store.dispatch(logout());

      localStorage.removeItem("token");

      alert("Jwt expierd. Please login again.");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
