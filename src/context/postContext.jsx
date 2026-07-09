import { createContext, useReducer, useEffect } from "react";
import { api } from "../services/interceptors.js";

import { initialState } from "../reducers/postReducer";
import postReducer from "../reducers/postReducer";
import { postActionTypes } from "../reducers/actionTypes";

const { CREATE_POST, GET_POSTS_SUCCESS, SET_ERROR, SET_LOADING } =
  postActionTypes;

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
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <PostContext.Provider value={{ state, dispatch, getPosts, createPost }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
