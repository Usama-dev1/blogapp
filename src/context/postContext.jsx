import { createContext, useReducer, useEffect, useMemo } from "react";
import { api } from "../services/interceptors.js";

import { initialState } from "../reducers/postReducer";
import postReducer from "../reducers/postReducer";
import { postActionTypes } from "../reducers/actionTypes";

const {
  CREATE_POST,
  DELETE_POST,
  GET_POST,
  GET_POSTS_SUCCESS,
  SET_ERROR,
  SET_LOADING,
} = postActionTypes;

const PostContext = createContext();

const errorMessage = (error, fallback) =>
  error?.response?.data?.message || error?.message || fallback;

export const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, initialState);

  const createPost = async (postData) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await api.post(`/post`, postData);
      const { data, success, message } = response.data;
      if (success && data) {
        dispatch({
          type: CREATE_POST,
          payload: { currentPost: data },
        });
      } else {
        dispatch({
          type: SET_ERROR,
          payload: message || "failed to fetch posts",
        });
      }
    } catch (error) {
      const msg = errorMessage(error, " failed to fetch posts");
      dispatch({ type: SET_ERROR, payload: msg });
      console.error("Error during fetch posts:", error);
      throw error;
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };
  const getPosts = async () => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await api.get(`/post`);
      const { data, success, message } = response.data;
      if (success && data?.posts) {
        dispatch({
          type: GET_POSTS_SUCCESS,
          payload: { posts: data?.posts, pagination: data?.pagination },
        });
      } else {
        dispatch({
          type: SET_ERROR,
          payload: message || "failed to fetch posts",
        });
      }
    } catch (error) {
      const msg = errorMessage(error, " failed to fetch posts");
      dispatch({ type: SET_ERROR, payload: msg });
      console.error("Error during fetch posts:", error);
      throw error;
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };
  const getPostById = async (id) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await api.get(`/post/${id}`);
      const { data, success } = response.data;
      if (success && data) {
        console.log("test2", data, success);
        dispatch({ type: GET_POST, payload: { currentPost: data } });
        console.log("test3", data);
      } else {
        dispatch({
          type: SET_ERROR,
          payload: "failed to fetch post",
        });
      }
    } catch (error) {
      const msg = errorMessage(error, "failed to fetch post");
      dispatch({ type: SET_ERROR, payload: msg });
      throw error;
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };
  const deletePost = async (postId) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await api.delete(`/post/${postId}`);
      const { success, message } = response.data;
      if (success) {
        dispatch({ type: DELETE_POST, payload: { postId } });
      } else {
        dispatch({
          type: SET_ERROR,
          payload: message || "failed to delete post",
        });
      }
    } catch (error) {
      const msg = errorMessage(error, "failed to delete post");
      dispatch({ type: SET_ERROR, payload: msg });
      throw error;
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  const value = useMemo(
    () => ({ state, dispatch, getPosts, createPost, getPostById, deletePost }),
    [state],
  );

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export default PostContext;
