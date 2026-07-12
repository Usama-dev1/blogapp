import { commentActionTypes } from "./actionTypes";

export const initialState = {
  comments: [],
  currentComment: {},
  pagination: {
    totalPages: null,
    totalPosts: null,
    limit: 10,
    currentPage: 1,
  },
  error: null,
  isLoading: false,
};

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case commentActionTypes.CREATE_COMMENT:
      return {
        ...state,
        comments: [action.payload.currentComment, ...state.comments],
        currentComment: action.payload.currentComment,
        error: null,
        isLoading: false,
      };
    case commentActionTypes.GET_COMMENTS:
      return {
        ...state,
        comments: action.payload?.comments ?? [],
        pagination: {
          ...state.pagination,
          ...(action.payload?.pagination ?? {}),
        },
        error: null,
        isLoading: false,
      };
    case commentActionTypes.GET_COMMENT:
      return {
        ...state,
        currentComment: action.payload.currentComment,
        error: null,
        isLoading: false,
      };
    case commentActionTypes.UPDATE_COMMENT:
      return {
        ...state,
        comments: state.comments.map((comm) =>
          action.payload.currentComment._id === comm._id
            ? action.payload.currentComment
            : comm,
        ),
        currentComment: action.payload.currentComment,
        error: null,
        isLoading: false,
      };
    case commentActionTypes.DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          (comm) => comm._id !== action.payload?.commentId,
        ),
        currentComment:
          state.currentComment?._id === action.payload?.commentId
            ? {}
            : state.currentComment,
        error: null,
        isLoading: false,
      };
    case commentActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case commentActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
}
