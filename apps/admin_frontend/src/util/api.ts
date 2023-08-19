import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

export const api: AxiosInstance = axios.create({
  baseURL: `${process.env["NEXT_PUBLIC_BACKEND_URL"]}/api/`,
});

// Add a request interceptor
api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token === "") {
    return config;
  }
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
