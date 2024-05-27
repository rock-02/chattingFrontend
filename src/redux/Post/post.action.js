import { api } from "../../config/api";
import {
  CREATE_COMMENT_FAILURE,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  GET_ALL_POSTS_FAILURE,
  GET_ALL_POSTS_REQUEST,
  GET_ALL_POSTS_SUCCESS,
  GET_USERS_POST_FAILURE,
  GET_USERS_POST_REQUEST,
  GET_USERS_POST_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
} from "./post.actionType";

export const createPostAction = (postData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_POST_REQUEST });
    console.log("create-post", postData);
    const { data } = await api.post(`api/posts`, postData);
    console.log("create-post", data);
    dispatch({ type: CREATE_POST_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: CREATE_POST_FAILURE, payload: error });
  }
};
export const getAllPostAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_POSTS_REQUEST });
    const { data } = await api.get(`/api/posts`);
    console.log("all-posts", data);

    dispatch({ type: GET_ALL_POSTS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_ALL_POSTS_FAILURE, payload: error });
  }
};

export const getUserPostAction = (userId) => async (dispatch) => {
  try {
    dispatch({ type: GET_USERS_POST_REQUEST });
    const { data } = await api.get(`/api/posts/${userId}`);
    console.log("user-posts", data);
    dispatch({ type: GET_USERS_POST_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_USERS_POST_FAILURE, payload: error });
  }
};

export const likePostAction = (postId) => async (dispatch) => {
  try {
    dispatch({ type: LIKE_POST_REQUEST });
    const { data } = await api.put(`/api/posts/like/${postId}`);
    console.log("like-post", data);
    dispatch({ type: LIKE_POST_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: LIKE_POST_FAILURE, payload: error });
  }
};

export const createCommentAction = (reqData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_COMMENT_REQUEST });
    const res = await api.post(
      `/api/comment/post/${reqData.postId}`,
      reqData.data
    );
    console.log("create-comment", res.data);
    dispatch({ type: CREATE_COMMENT_SUCCESS, payload: res.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: CREATE_COMMENT_FAILURE, payload: error });
  }
};
