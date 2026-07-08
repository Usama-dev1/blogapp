import { createContext, useReducer, useEffect } from "react";
import { api } from "../services/interceptors.js";

import { initialState } from "../reducers/categoryReducer";
import categoryReducer from "../reducers/categoryReducer";
import { categoryActionTypes } from "../reducers/actionTypes";

const { CREATE_CATEGORY, GET_CATEGORY_SUCCESS, SET_ERROR, SET_LOADING } =
  categoryActionTypes;

const CategoryContext = createContext();

const errorMessage = (error, fallback) =>
  error?.response?.data?.message || error?.message || fallback;

export const CategoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(categoryReducer, initialState);

  const getCategory = async () => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await api.get(`/categories`);
      const { data, success, message } = response.data;
      if (success && data) {
        dispatch({
          type: GET_CATEGORY_SUCCESS,
          payload: { category: data },
        });
      } else {
        dispatch({
          type: SET_ERROR,
          payload: message || "failed to fetch category",
        });
      }
    } catch (error) {
      const msg = errorMessage(error, " failed to fetch category");
      dispatch({ type: SET_ERROR, payload: msg });
      console.error("Error during fetch category:", error);
      throw error;
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <CategoryContext.Provider value={{ state, dispatch, getCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContext;
