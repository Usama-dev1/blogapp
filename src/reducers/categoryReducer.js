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
        category: [action.payload?.data ?? action.payload, ...state.category],
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
