import { likeActionTypes } from "./actionTypes";

export const initialState = {
  likes: [],
  likeCount: null,
  error: null,
  isLoading: false,
};

export default function likeReducer(state = initialState, action) {
  switch (action.type) {
    case likeActionTypes.CREATE_LIKE:
      return {
        ...state,
        likes: [action.payload?.like, ...state.likes],
        likeCount: action.payload?.likeCount,
        error: null,
        isLoading: false,
      };
    case likeActionTypes.GET_LIKES:
      return {
        ...state,
        likes: action.payload?.likes ?? [],
        likeCount: action.payload?.likeCount,
        error: null,
        isLoading: false,
      };
    case likeActionTypes.DELETE_LIKE:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like._id !== action.payload?.likeId,
        ),
        likeCount: action.payload?.likeCount,
        error: null,
        isLoading: false,
      };
    case likeActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case likeActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
}
