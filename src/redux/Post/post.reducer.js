import {
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  GET_ALL_POSTS_FAILURE,
  GET_ALL_POSTS_REQUEST,
  GET_ALL_POSTS_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
} from "./post.actionType";

const initialState = {
  post: null,
  loading: false,
  error: null,
  posts: [],
  like: null,
  newComment: null,
};
export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
    case GET_ALL_POSTS_REQUEST:
    case LIKE_POST_REQUEST:
    case CREATE_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        post: action.payload,
        error: null,
        posts: [action.payload, ...state.posts],
      };
    case GET_ALL_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
        error: null,
      };

    case CREATE_COMMENT_SUCCESS:
      return {
        loading: false,
        error: null,
        newComment: action.payload,
      };
    case LIKE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        like: action.payload,
        error: null,
        posts: state.posts.map((post) =>
          post.postID === action.payload.postId ? action.payload : post
        ),
      };
    case CREATE_POST_FAILURE:
    case GET_ALL_POSTS_FAILURE:
    case LIKE_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
