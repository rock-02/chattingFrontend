import {
  GET_SAVED_POST_FAILURE,
  GET_SAVED_POST_SUCCESS,
} from "../Post/post.actionType";

const {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_REQUEST,
  UPDATE_PROFILE_REQUEST,
  SEARCH_USER_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
} = require("./auth.authType");

const initialState = {
  jwt: null,
  loading: false,
  error: null,
  user: null,
  searchUser: [],
  savedPosts: [],
  savePost: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case GET_PROFILE_REQUEST:
    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        jwt: action.payload,
      };
    case GET_PROFILE_SUCCESS:
      return { ...state, loading: false, error: null, user: action.payload };
    case UPDATE_PROFILE_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
      };
    }
    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        searchUser: action.payload,
      };
    case GET_SAVED_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        savedPosts: action.payload,
      };
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
