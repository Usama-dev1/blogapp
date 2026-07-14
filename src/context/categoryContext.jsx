import {
  createContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { api } from "../services/interceptors.js";
import { initialState } from "../reducers/categoryReducer";
import categoryReducer from "../reducers/categoryReducer";
import { categoryActionTypes } from "../reducers/actionTypes";

const {
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORY_SUCCESS,
  SET_ERROR,
  SET_LOADING,
} = categoryActionTypes;

const CategoryContext = createContext();

const errorMessage = (error, fallback) =>
  error?.response?.data?.message || error?.message || fallback;

export const CategoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(categoryReducer, initialState);

  const getCategory = useCallback(async () => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await api.get(`/categories`);
      const { data, success, message } = response.data;
      if (success && data) {
        dispatch({ type: GET_CATEGORY_SUCCESS, payload: { category: data } });
      } else {
        dispatch({
          type: SET_ERROR,
          payload: message || "failed to fetch category",
        });
      }
    } catch (error) {
      const msg = errorMessage(error, "failed to fetch category");
      dispatch({ type: SET_ERROR, payload: msg });
      console.error("Error during fetch category:", error);
      throw error;
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  }, []);

  const createCategory = async (categoryData) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await api.post(`/categories`, categoryData);
      const { data, success, message } = response.data;
      if (success && data) {
        dispatch({ type: CREATE_CATEGORY, payload: { currentCategory: data } });
      } else {
        dispatch({
          type: SET_ERROR,
          payload: message || "failed to create category",
        });
      }
    } catch (error) {
      const msg = errorMessage(error, "failed to create category");
      dispatch({ type: SET_ERROR, payload: msg });
      throw error;
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };

  const updateCategory = async (id, categoryData) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await api.put(`/categories/${id}`, categoryData);
      const { data, success, message } = response.data;
      if (success && data) {
        dispatch({ type: UPDATE_CATEGORY, payload: { currentCategory: data } });
      } else {
        dispatch({
          type: SET_ERROR,
          payload: message || "failed to update category",
        });
      }
    } catch (error) {
      const msg = errorMessage(error, "failed to update category");
      dispatch({ type: SET_ERROR, payload: msg });
      throw error;
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };

  const deleteCategory = async (categoryId) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await api.delete(`/categories/${categoryId}`);
      const { success, message } = response.data;
      if (success) {
        dispatch({ type: DELETE_CATEGORY, payload: { categoryId } });
      } else {
        dispatch({
          type: SET_ERROR,
          payload: message || "failed to delete category",
        });
      }
    } catch (error) {
      const msg = errorMessage(error, "failed to delete category");
      dispatch({ type: SET_ERROR, payload: msg });
      throw error;
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };

  useEffect(() => {
    getCategory();
  }, [getCategory]);

  const value = useMemo(
    () => ({
      state,
      dispatch,
      getCategory,
      createCategory,
      updateCategory,
      deleteCategory,
    }),
    [state, getCategory],
  );

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContext;
