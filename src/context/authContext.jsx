import { createContext, useReducer, useEffect } from "react";
import { api } from "../services/interceptors.js";

import authReducer from "../reducers/authReducer";
import { authActionTypes } from "../reducers/actionTypes";
const { SET_USER, LOGOUT, SET_ERROR, SET_LOADING } = authActionTypes;
const AuthContext = createContext();

const getStoredToken = () => {
  try {
    return localStorage.getItem("accessToken");
  } catch (error) {
    console.error("Error retrieving access token from localStorage:", error);
    return null;
  }
};

const storeToken = (token) => {
  if (!token) return;
  try {
    localStorage.setItem("accessToken", token);
  } catch (error) {
    console.error("Error storing access token in localStorage:", error);
  }
};

const clearStoredToken = () => {
  try {
    localStorage.removeItem("accessToken");
  } catch (error) {
    console.error("Error clearing access token from localStorage:", error);
  }
};

const errorMessage = (error, fallback) =>
  error?.response?.data?.message || error?.message || fallback;

export const AuthProvider = ({ children }) => {
  const storedToken = getStoredToken();

  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: storedToken,
    isAuthenticated: Boolean(storedToken),
    error: null,
    isLoading: false,
  });
  useEffect(() => {
    const getProfile = async () => {
      const token = getStoredToken();
      console.log("Token found:", token);
      if (!token) {
        dispatch({ type: LOGOUT });
        return;
      }
      try {
        const response = await api.get(`/auth/get-me`);
        const { data, success } = response.data;
        if (success && data?.user) {
          dispatch({
            type: SET_USER,
            payload: { user: data.user },
          });
        } else {
          clearStoredToken();
          dispatch({ type: LOGOUT });
        }
      } catch (err) {
        clearStoredToken();
        dispatch({ type: LOGOUT });
      }
    };
    getProfile();
  }, []);

  const login = async (credentials) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await api.post(`/auth/login`, credentials);
      const { data, success, message } = response.data;
      if (success && data?.user) {
        storeToken(data.accessToken);
        dispatch({
          type: SET_USER,
          payload: { user: data?.user, token: data?.accessToken },
        });
      } else {
        dispatch({ type: SET_ERROR, payload: message || "Login failed" });
      }
    } catch (error) {
      const msg = errorMessage(error, "Login failed");
      dispatch({ type: SET_ERROR, payload: msg });
      console.error("Error during login:", error);
      throw error;
    }
  };

  const register = async (userData) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await api.post(`/auth/register`, userData);
      const { data, success, message } = response.data;

      if (success && data?.user) {
        storeToken(data.accessToken);
        dispatch({
          type: SET_USER,
          payload: { user: data?.user, token: data?.accessToken },
        });
      } else {
        dispatch({
          type: SET_ERROR,
          payload: message || "Registration failed",
        });
      }
    } catch (error) {
      const msg = errorMessage(error, "Registration failed");
      dispatch({ type: SET_ERROR, payload: msg });
      console.error("Error during registration:", error);
      throw error;
    }
  };

  const logout = async () => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await api.post(`/auth/logout`);
      const { success, message } = response;

      if (success) {
        clearStoredToken();
        dispatch({ type: LOGOUT });
      } else {
        dispatch({ type: SET_ERROR, payload: message || "Logout failed" });
      }
    } catch (error) {
      const msg = errorMessage(error, "Logout failed");
      dispatch({ type: SET_ERROR, payload: msg });
      console.error("Error during logout:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ state, dispatch, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
