import { createContext, useReducer } from "react";
import { api } from "../services/interceptors.js";
import { initialState } from "../reducers/likeReducer";
import likeReducer from "../reducers/likeReducer";
import { likeActionTypes } from "../reducers/actionTypes";

const { GET_LIKES, CREATE_LIKE, DELETE_LIKE, SET_ERROR, SET_LOADING } =
  likeActionTypes;

const LikeContext = createContext();

const errorMessage = (error, fallback) =>
  error?.response?.data?.message || error?.message || fallback;

export const LikeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(likeReducer, initialState);

  const getLikes = async (postId) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await api.get(`/post/${postId}/like`);
      const { data, success, message, likeCount } = response.data;
      if (success && data) {
        dispatch({ type: GET_LIKES, payload: { likes: data, likeCount } });
      } else {
        dispatch({
          type: SET_ERROR,
          payload: message || "failed to fetch likes",
        });
      }
    } catch (error) {
      const msg = errorMessage(error, "failed to fetch likes");
      dispatch({ type: SET_ERROR, payload: msg });
      console.error("Error during fetch likes:", error);
      throw error;
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };

  const createLike = async (postId) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await api.post(`/post/${postId}/like`);
      const { data, success, message, likeCount } = response.data;
      if (success && data) {
        dispatch({ type: CREATE_LIKE, payload: { like: data, likeCount } });
      } else {
        dispatch({
          type: SET_ERROR,
          payload: message || "failed to add like",
        });
      }
    } catch (error) {
      const msg = errorMessage(error, "failed to add like");
      dispatch({ type: SET_ERROR, payload: msg });
      throw error;
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };

  const removeLike = async (postId) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await api.delete(`/post/${postId}/like`);
      const { success, message, likeCount } = response.data;
      if (success) {
        dispatch({ type: DELETE_LIKE, payload: { likeId: postId, likeCount } });
      } else {
        dispatch({
          type: SET_ERROR,
          payload: message || "failed to remove like",
        });
      }
    } catch (error) {
      const msg = errorMessage(error, "failed to remove like");
      dispatch({ type: SET_ERROR, payload: msg });
      throw error;
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };

  return (
    <LikeContext.Provider
      value={{ state, dispatch, getLikes, createLike, removeLike }}
    >
      {children}
    </LikeContext.Provider>
  );
};

export default LikeContext;
