import axios from "axios";
const { API_BASE_URL, api } = require("../../config/api");
const {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAILURE,
  USER_SAVED_POST_SUCCESS,
  USER_SAVED_POST_REQUEST,
  USER_SAVED_POST_FAILURE,
} = require("./auth.authType");

export const loginUserAction = (loginData) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    console.log("Login Data", loginData);

    const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData);
    console.log("res data", data);
    if (data.token) {
      localStorage.setItem("jwt", data.token);
    }

    console.log("Login Success", data);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.token,
    });
  } catch (error) {
    console.log("-------------Error----------", error);
    dispatch({
      type: LOGIN_FAILURE,
      payload: error,
    });
  }
};

export const registerUserAction = (loginData) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_REQUEST,
    });

    const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, loginData);

    if (data.token) {
      localStorage.setItem("jwt", data.token);
    }

    console.log("Register Success", data);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data.token,
    });
  } catch (error) {
    console.log("-------------Error----------", error);
    dispatch({
      type: REGISTER_FAILURE,
      payload: error,
    });
  }
};

export const getProfileAction = (jwt) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PROFILE_REQUEST,
    });

    const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log("_________Profile_________", data);
    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("-------------Error----------", error);
    dispatch({
      type: GET_PROFILE_FAILURE,
      payload: error,
    });
  }
};

export const updateProfileAction = (reqData) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PROFILE_REQUEST,
    });

    const { data } = await api.put(`${API_BASE_URL}/api/users`, reqData);

    console.log("Register Success", data);

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("-------------Error----------", error);
    dispatch({
      type: UPDATE_PROFILE_FAILURE,
      payload: error,
    });
  }
};

export const searchUserAction = (query) => async (dispatch) => {
  try {
    dispatch({
      type: SEARCH_USER_REQUEST,
    });

    const { data } = await api.get(
      `${API_BASE_URL}/api/users/search?query=${query}`
    );

    // console.log("Search User Success", data);
    dispatch({
      type: SEARCH_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("-------------Error----------", error);
    dispatch({
      type: SEARCH_USER_FAILURE,
      payload: error,
    });
  }
};

export const GetSavedPostAction = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_SAVED_POST_REQUEST,
    });

    const { data } = await api.get(`${API_BASE_URL}/posts/savedposts`);

    console.log("Get Saved Post Success", data);
    dispatch({
      type: USER_SAVED_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("-------------Error----------", error);
    dispatch({
      type: USER_SAVED_POST_FAILURE,
      payload: error,
    });
  }
};
