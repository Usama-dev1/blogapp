import { authActionTypes } from "./actionTypes";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case authActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload?.user ?? action.payload,
        token: action.payload?.token ?? null,
        isAuthenticated: true,
        error: null,
        isLoading: false,
      };
    case authActionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      };
    case authActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case authActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
        error: null,
      };
    default:
      return state;
  }
}
