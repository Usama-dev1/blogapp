import { createContext, useReducer, useMemo } from "react";
import { api } from "../services/interceptors.js";
import { initialState } from "../reducers/likeReducer";
import likeReducer from "../reducers/likeReducer";
import { likeActionTypes } from "../reducers/actionTypes";

const { GET_LIKES, CREATE_LIKE, DELETE_LIKE, SET_ERROR, SET_LOADING } =
  likeActionTypes;

export const LikeContext = createContext();

const errorMessage = (error, fallback) =>
  error?.response?.data?.message || error?.message || fallback;

export const LikeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(likeReducer, initialState);

  const getLikes = async (postId) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await api.get(`/post/${postId}/likes`);
      console.log("Like response:", response.data);

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
      dispatch({
        type: SET_ERROR,
        payload: errorMessage(error, "failed to fetch likes"),
      });
      throw error;
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };

  const createLike = async (postId) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await api.post(`/post/${postId}/likes`);
      const { data, success, message, likeCount } = response.data;
      if (success && data) {
        dispatch({ type: CREATE_LIKE, payload: { like: data, likeCount } });
      } else {
        dispatch({ type: SET_ERROR, payload: message || "failed to add like" });
      }
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: errorMessage(error, "failed to add like"),
      });
      throw error;
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };

  const removeLike = async (postId) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await api.delete(`/post/${postId}/likes`);
      const { data, success, message, likeCount } = response.data;
      if (success) {
        dispatch({
          type: DELETE_LIKE,
          payload: { likeId: data._id, likeCount },
        });
      } else {
        dispatch({
          type: SET_ERROR,
          payload: message || "failed to remove like",
        });
      }
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: errorMessage(error, "failed to remove like"),
      });
      throw error;
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };
  const value = useMemo(
    () => ({
      state,
      dispatch,
      getLikes,
      createLike,
      removeLike,
    }),
    [state],
  );
  return <LikeContext.Provider value={value}>{children}</LikeContext.Provider>;
};

export default LikeContext;
