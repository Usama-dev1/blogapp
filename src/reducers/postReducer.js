import { postActionTypes } from "./actionTypes";

export const initialState = {
  posts: [],
  draftPosts: [],
  currentDraftPost: {},
  currentPost: {},
  pagination: {
    totalPages: null,
    totalPosts: null,
    limit: 10,
    currentPage: 1,
  },
  error: null,
  isLoading: false,
};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case postActionTypes.CREATE_POST:
      //if save draft button is clicked with draft true flag update draft state else post state
      if (action.payload.currentPost.draft) {
        return {
          ...state,
          draftPosts: [action.payload.currentPost, ...state.draftPosts],
          currentPost: action.payload.currentPost,
          error: null,
          isLoading: false,
        };
      }
      return {
        ...state,
        posts: [action.payload.currentPost, ...state.posts],
        currentPost: action.payload.currentPost,
        error: null,
        isLoading: false,
      };
    case postActionTypes.GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload?.posts ?? [],
        pagination: {
          ...state.pagination,
          ...(action.payload?.pagination ?? {}),
        },
        error: null,
        isLoading: false,
      };
    case postActionTypes.GET_POST:
      return {
        ...state,
        currentPost: action.payload.currentPost,
        error: null,
        isLoading: false,
      };
    case postActionTypes.UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          action.payload.currentPost._id === post._id
            ? action.payload.currentPost
            : post,
        ),
        currentPost: action.payload.currentPost,
        error: null,
        isLoading: false,
      };
    case postActionTypes.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(
          (post) => post._id !== action.payload?.postId,
        ),
        currentPost:
          state.currentPost?._id === action.payload?.postId
            ? {}
            : state.currentPost,
        error: null,
        isLoading: false,
      };
    case postActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case postActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case postActionTypes.GET_DRAFT_POSTS:
      return {
        ...state,
        draftPosts: action.payload?.draftPosts ?? [],
        pagination: {
          ...state.pagination,
          ...(action.payload?.pagination ?? {}),
        },
        error: null,
        isLoading: false,
      };
    case postActionTypes.GET_DRAFT_POST:
      return {
        ...state,
        currentDraftPost: action.payload.currentDraftPost,
        error: null,
        isLoading: false,
      };
    case postActionTypes.DELETE_DRAFT_POST:
      return {
        ...state,
        draftPosts: state.draftPosts.filter(
          (post) => post._id !== action.payload?.postId,
        ),
        currentDraftPost:
          state.currentDraftPost?._id === action.payload?.postId
            ? {}
            : state.currentDraftPost,
        error: null,
        isLoading: false,
      };
    case postActionTypes.UPDATE_DRAFT_POST:
      return {
        ...state,
        draftPosts: state.draftPosts.map((post) =>
          action.payload.currentDraftPost._id === post._id
            ? action.payload.currentDraftPost
            : post,
        ),
        currentDraftPost: action.payload.currentDraftPost,
        error: null,
        isLoading: false,
      };
    case postActionTypes.PUBLISH_DRAFT_POST:
      return {
        ...state,
        draftPosts: state.draftPosts.filter(
          (post) => post._id !== action.payload.publishedPost._id,
        ),
        posts: [action.payload.publishedPost, ...state.posts],
        currentPost: action.payload.publishedPost,
        error: null,
        isLoading: false,
      };
    default:
      return state;
  }
}
