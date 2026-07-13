import { createContext, useReducer, useEffect, useMemo } from "react";
import { api } from "../services/interceptors.js";
import { useContext } from "react";
import AuthContext from "./authContext.jsx";
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
  UPDATE_POST,
  GET_DRAFT_POST,
  GET_DRAFT_POSTS,
  DELETE_DRAFT_POST,
  UPDATE_DRAFT_POST,
  PUBLISH_DRAFT_POST,
} = postActionTypes;

const PostContext = createContext();

const errorMessage = (error, fallback) =>
  error?.response?.data?.message || error?.message || fallback;

export const PostProvider = ({ children }) => {
  const {
    state: { isAuthenticated },
  } = useContext(AuthContext);
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
  const updatePost = async (id, postData) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await api.put(`/post/${id}`, postData);
      const { data, success, message } = response.data;
      if (success && data) {
        dispatch({
          type: UPDATE_POST,
          payload: { currentPost: data },
        });
      } else {
        dispatch({
          type: SET_ERROR,
          payload: message || "failed to update post",
        });
      }
    } catch (error) {
      const msg = errorMessage(error, " failed to update post");
      dispatch({ type: SET_ERROR, payload: msg });
      console.error("Error during fetch posts:", error);
      throw error;
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };
  const getPosts = async (page = 1, limit = 10, myPosts = false) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await api.get(`/post`, {
        params: { page, limit, myPosts },
      });
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
    dispatch({ type: SET_ERROR, payload: null });
    try {
      const response = await api.get(`/post/${id}`);
      const { data, success } = response.data;
      if (success && data) {
        dispatch({ type: GET_POST, payload: { currentPost: data } });
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
  const getDraftPosts = async () => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await api.get(`/post/drafts`);
      const { data, success, message } = response.data;

      if (success && data?.posts) {
        dispatch({
          type: GET_DRAFT_POSTS,
          payload: { draftPosts: data?.posts, pagination: data?.pagination },
        });
      } else {
        dispatch({
          type: SET_ERROR,
          payload: message || "failed to fetch all posts",
        });
      }
    } catch (error) {
      const msg = errorMessage(error, " failed to fetch all posts");
      dispatch({ type: SET_ERROR, payload: msg });
      console.error("Error during fetch posts:", error);
      throw error;
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };
  const getDraftPostById = async (id) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await api.get(`/post/drafts/${id}`);
      const { data, success } = response.data;
      if (success && data) {
        dispatch({ type: GET_DRAFT_POST, payload: { currentDraftPost: data } });
      } else {
        dispatch({
          type: SET_ERROR,
          payload: "failed to fetch single draft post",
        });
      }
    } catch (error) {
      const msg = errorMessage(error, "failed to fetch draft post");
      dispatch({ type: SET_ERROR, payload: msg });
      throw error;
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };
  const deleteDraftPost = async (postId) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await api.delete(`/post/${postId}`);
      const { success, message } = response.data;
      if (success) {
        dispatch({ type: DELETE_DRAFT_POST, payload: { postId } });
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
  const updateDraftPost = async (id, postData) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await api.put(`/post/${id}`, postData);
      const { data, success, message } = response.data;
      if (success && data) {
        dispatch({
          type: UPDATE_DRAFT_POST,
          payload: { currentDraftPost: data },
        });
      } else {
        dispatch({
          type: SET_ERROR,
          payload: message || "failed to update post",
        });
      }
    } catch (error) {
      const msg = errorMessage(error, " failed to update post");
      dispatch({ type: SET_ERROR, payload: msg });
      console.error("Error during fetch posts:", error);
      throw error;
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };
  const publishDraftPost = async (id, postData) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await api.put(`/post/${id}`, postData);
      const { data, success, message } = response.data;
      if (success && data) {
        dispatch({
          type: PUBLISH_DRAFT_POST,
          payload: { publishedPost: data },
        });
      } else {
        dispatch({
          type: SET_ERROR,
          payload: message || "failed to publish post",
        });
      }
    } catch (error) {
      const msg = errorMessage(error, "failed to publish post");
      dispatch({ type: SET_ERROR, payload: msg });
      console.error("Error publishing post:", error);
      throw error;
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };
  useEffect(() => {
    getPosts();
    if (isAuthenticated) getDraftPosts();
  }, [isAuthenticated]);

  const value = useMemo(
    () => ({
      state,
      dispatch,
      getPosts,
      createPost,
      getPostById,
      deletePost,
      updatePost,
      getDraftPostById,
      getDraftPosts,
      deleteDraftPost,
      updateDraftPost,
      publishDraftPost,
    }),
    [state],
  );

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export default PostContext;
