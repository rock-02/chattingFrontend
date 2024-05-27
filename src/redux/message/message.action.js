import {
  CREATE_CHAT_FAILURE,
  CREATE_CHAT_REQUEST,
  CREATE_CHAT_SUCCESS,
  CREATE_MESSAGE_FAILURE,
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  GET_ALL_CHAT_FAILURE,
  GET_ALL_CHAT_REQUEST,
  GET_ALL_CHAT_SUCCESS,
} from "./message.action.type";

import { api } from "../../config/api";

export const CreateMessage = (message) => async (dispatch) => {
  dispatch({ type: CREATE_MESSAGE_REQUEST });

  try {
    console.log("message", message);
    const { data } = await api.post(
      `/api/messages/${message.chatId}`,
      message.data
    );
    console.log("created message", data);
    dispatch({ type: CREATE_MESSAGE_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: CREATE_MESSAGE_FAILURE, payload: error });
  }
};

export const CreateChat = (userId) => async (dispatch) => {
  dispatch({ type: CREATE_CHAT_REQUEST });

  try {
    console.log("chat", userId);
    const { data } = await api.post(`/api/chat/${userId}`);
    console.log("created chat", data);
    dispatch({ type: CREATE_CHAT_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: CREATE_CHAT_FAILURE, payload: error });
  }
};

export const GetAllChat = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_CHAT_REQUEST });
    const { data } = await api.get("/api/chats");
    console.log("all chat", data);
    dispatch({ type: GET_ALL_CHAT_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: GET_ALL_CHAT_FAILURE, payload: error });
  }
};
