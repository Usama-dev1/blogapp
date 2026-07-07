import axios from "axios";
import config from "../config/config";
export const api = axios.create({
  baseURL: config.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const TOKEN_STORAGE_KEY = "accessToken";

const getStoredToken = () => {
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  } catch (error) {
    console.error("Error retrieving access token from localStorage:", error);
    return null;
  }
};

const setStoredToken = (token) => {
  if (!token) return;

  try {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  } catch (error) {
    console.error("Error storing access token in localStorage:", error);
  }
};

const clearStoredToken = () => {
  try {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing access token from localStorage:", error);
  }
};

const processQueue = (error, token = null) => {
  try {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
  } catch (err) {
    console.error("Error processing failed queue:", err);
  } finally {
    failedQueue = [];
  }
};

api.interceptors.request.use(
  (requestConfig) => {
    try {
      const token = getStoredToken();
      if (token) {
        requestConfig.headers = {
          ...requestConfig.headers,
          Authorization: `Bearer ${token}`,
        };
      }
    } catch (err) {
      console.error("Error retrieving access token from localStorage:", err);
    }
    return requestConfig;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/login") &&
      !originalRequest.url?.includes("/auth/register") &&
      !originalRequest.url?.includes("/auth/refresh-token")
    ) {
      console.log("401 detected, starting refresh flow...");
      if (isRefreshing) {
        try {
          const token = await new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });

          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${token}`,
          };
          return api(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post(
          `/auth/refresh-token`,
          {},
          {
            withCredentials: true,
          },
        );

        const newToken = data?.accessToken ?? data?.token;
        setStoredToken(newToken);
        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

        processQueue(null, newToken);
        return api(originalRequest);
      } catch (refreshError) {
        console.error("REFRESH FAILED:", refreshError); // IS THIS LOGGING?
        processQueue(refreshError, null);
        clearStoredToken();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
