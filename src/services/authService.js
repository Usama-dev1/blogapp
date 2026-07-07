import { api } from "./interceptors.js";
const authApi = {
  login: async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      if (response.data.success) {
        return response.data.data;
      }
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  },
  register: async (userData) => {
    try {
      const response = await api.post("/auth/register", userData);
      if (response.data.success) {
        return response.data.data;
      }
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  },
  logout: async () => {
    try {
      const response = await api.post("/auth/logout");
      if (response.data.success) {
        return true;
      }
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  },
  getCurrentUser: async () => {
    try {
      const response = await api.get("/auth/get-me");
      if (response.data.success) {
        return response.data.data;
      }
    } catch (error) {
      console.error("Error fetching current user:", error);
      throw error;
    }
  },
};
export default authApi;
