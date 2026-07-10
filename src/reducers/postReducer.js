import { postActionTypes } from "./actionTypes";

export const initialState = {
  posts: [],
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
    default:
      return state;
  }
}
