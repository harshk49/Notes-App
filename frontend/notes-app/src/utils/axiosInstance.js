import axios from "axios";
import { BASE_URL } from "./constants";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercept requests and add the Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const accessToken = localStorage.getItem("token");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch (error) {
      console.error("Error retrieving token from localStorage:", error);
      // Optionally you could log out the user or show an error
    }
    return config;
  },
  (error) => {
    // Handle errors that occur before the request is sent
    return Promise.reject(error);
  }
);

// Optional: Intercept responses for automatic token refresh handling
axiosInstance.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      // Optionally: Refresh token logic can go here
      // const newToken = await refreshAuthToken(); // Implement token refresh logic
      // localStorage.setItem("token", newToken);
      // originalRequest.headers.Authorization = `Bearer ${newToken}`;

      // Retry the original request
      // return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
