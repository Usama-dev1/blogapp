import { createContext, useReducer, useMemo } from "react";
import { api } from "../services/interceptors.js";
import { initialState } from "../reducers/commentReducer";
import commentReducer from "../reducers/commentReducer";
import { commentActionTypes } from "../reducers/actionTypes";

const {
  CREATE_COMMENT,
  GET_COMMENTS,
  GET_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  SET_ERROR,
  SET_LOADING,
} = commentActionTypes;

export const CommentContext = createContext();

const errorMessage = (error, fallback) =>
  error?.response?.data?.message || error?.message || fallback;

export const CommentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(commentReducer, initialState);

  const getComments = async (postId, page = 1, limit = 10) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await api.get(`/post/${postId}/comments`, {
        params: { page, limit },
      });
      const { data, success, message } = response.data;
      console.log("get comment", data);
      if (success && data?.comments) {
        dispatch({
          type: GET_COMMENTS,
          payload: { comments: data.comments, pagination: data.pagination },
        });
      } else {
        dispatch({
          type: SET_ERROR,
          payload: message || "failed to fetch comments",
        });
      }
    } catch (error) {
      const msg = errorMessage(error, "failed to fetch comments");
      dispatch({ type: SET_ERROR, payload: msg });
      console.error("Error during fetch comments:", error);
      throw error;
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };

  const getCommentById = async (postId, commentId) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await api.get(`/post/${postId}/comments/${commentId}`);
      const { data, success, message } = response.data;
      console.log("get comment id", data);

      if (success && data) {
        dispatch({ type: GET_COMMENT, payload: { currentComment: data } });
      } else {
        dispatch({
          type: SET_ERROR,
          payload: message || "failed to fetch comment",
        });
      }
    } catch (error) {
      const msg = errorMessage(error, "failed to fetch comment");
      dispatch({ type: SET_ERROR, payload: msg });
      throw error;
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };

  const createComment = async (postId, content) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await api.post(`/post/${postId}/comments`, { content });
      const { data, success, message } = response.data;
      console.log("create comment", data);

      if (success && data) {
        dispatch({ type: CREATE_COMMENT, payload: { currentComment: data } });
      } else {
        dispatch({
          type: SET_ERROR,
          payload: message || "failed to create comment",
        });
      }
    } catch (error) {
      const msg = errorMessage(error, "failed to create comment");
      dispatch({ type: SET_ERROR, payload: msg });
      throw error;
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };

  const updateComment = async (postId, commentId, content) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await api.put(`/post/${postId}/comments/${commentId}`, {
        content,
      });
      const { data, success, message } = response.data;
      if (success && data) {
        dispatch({ type: UPDATE_COMMENT, payload: { currentComment: data } });
      } else {
        dispatch({
          type: SET_ERROR,
          payload: message || "failed to update comment",
        });
      }
    } catch (error) {
      const msg = errorMessage(error, "failed to update comment");
      dispatch({ type: SET_ERROR, payload: msg });
      throw error;
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };

  const deleteComment = async (postId, commentId) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await api.delete(
        `/post/${postId}/comments/${commentId}`,
      );
      const { success, message } = response.data;
      if (success) {
        dispatch({ type: DELETE_COMMENT, payload: { commentId } });
      } else {
        dispatch({
          type: SET_ERROR,
          payload: message || "failed to delete comment",
        });
      }
    } catch (error) {
      const msg = errorMessage(error, "failed to delete comment");
      dispatch({ type: SET_ERROR, payload: msg });
      throw error;
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };

  const value = useMemo(
    () => ({
      state,
      dispatch,
      getComments,
      getCommentById,
      createComment,
      updateComment,
      deleteComment,
    }),
    [state],
  );

  return (
    <CommentContext.Provider value={value}>{children}</CommentContext.Provider>
  );
};
export default CommentContext;
