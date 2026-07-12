import { categoryActionTypes } from "./actionTypes";

export const initialState = {
  category: [],
  currentCategory: {},
  error: null,
  isLoading: false,
};

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case categoryActionTypes.CREATE_CATEGORY:
      return {
        ...state,
        category: [action.payload, ...state.category],
        error: null,
        isLoading: false,
      };
    case categoryActionTypes.GET_CATEGORY_SUCCESS:
      return {
        ...state,
        category: action.payload?.category ?? [],
        error: null,
        isLoading: false,
      };
    case categoryActionTypes.UPDATE_CATEGORY:
      return {
        ...state,
        category: state.category.map((comm) =>
          action.payload.currentCategory._id === comm._id
            ? action.payload.currentCategory
            : comm,
        ),
        currentCategory: action.payload.currentCategory,
        error: null,
        isLoading: false,
      };
    case categoryActionTypes.DELETE_CATEGORY:
      return {
        ...state,
        category: state.category.filter(
          (comm) => comm._id !== action.payload?.categoryId,
        ),
        currentCategory:
          state.currentCategory?._id === action.payload?.categoryId
            ? {}
            : state.currentCategory,
        error: null,
        isLoading: false,
      };
    case categoryActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case categoryActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
}
