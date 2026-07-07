import { api } from "./interceptors";

export const postApi = {
  getAllPosts: async (page = 1, limit = 10) => {
    try {
      const response = await api.get(`/post?page=${page}&limit=${limit}`);
      if (response.data.success) {
        return response.data.data;
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },

  getPostById: async (postId) => {
    try {
      const response = await api.get(`/post/${postId}`);
      if (response.data.success) {
        return response.data.data;
      }
    } catch (error) {
      console.error(`Error fetching post with ID ${postId}:`, error);
      throw error;
    }
  },

  createPost: async (postData) => {
    try {
      const response = await api.post("/post", postData);
      if (response.data.success) {
        return response.data.data;
      }
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  },

  deletePost: async (postId) => {
    try {
      const response = await api.delete(`/post/${postId}`);
      if (response.data.success) {
        return true;
      }
    } catch (error) {
      console.error(`Error deleting post with ID ${postId}:`, error);
      throw error;
    }
  },

  updatePost: async (postId, postData) => {
    try {
      const response = await api.put(`/post/${postId}`, postData);
      if (response.data.success) {
        return response.data.data;
      }
    } catch (error) {
      console.error(`Error updating post with ID ${postId}:`, error);
      throw error;
    }
  },
};

export const draftApi = {
  getAllDrafts: async (page = 1, limit = 10) => {
    try {
      const response = await api.get(
        `/post/drafts?page=${page}&limit=${limit}`,
      );
      if (response.data.success) {
        return response.data.data;
      }
    } catch (error) {
      console.error("Error fetching drafts:", error);
      throw error;
    }
  },

  getDraftById: async (draftId) => {
    try {
      const response = await api.get(`/post/drafts/${draftId}`);
      if (response.data.success) {
        return response.data.data;
      }
    } catch (error) {
      console.error(`Error fetching draft with ID ${draftId}:`, error);
      throw error;
    }
  },
};
