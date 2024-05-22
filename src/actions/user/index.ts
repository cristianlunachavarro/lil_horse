"use client";
import { Dispatch } from "redux";
import instance from "@/axiosInstance";
import {
  loginSuccess,
  loginFailure,
  logoutSuccess,
} from "../../store/slices/user";

export const loginUser =
  (username: string, password: string) => async (dispatch: Dispatch) => {
    try {
      const { data } = await instance.post("/user/login", {
        username,
        password,
      });
      if ("error" in data) {
        return;
      }

      if (typeof window !== undefined) {
        localStorage.setItem("access_token", data.token);
      }
      dispatch(loginSuccess(data.user));
    } catch (error) {
      dispatch(loginFailure("Error"));
    }
  };

export const logoutUser = () => (dispatch: Dispatch) => {
  localStorage.removeItem("access_token");
  while (localStorage.getItem("access_token")) {}
  dispatch(logoutSuccess());
};

export const createUser =
  (username: string, password: string) => async (dispatch: Dispatch) => {
    try {
      const { data } = await instance.post("/user/register", {
        username,
        password,
      });
      console.log({ data });
      if ("error" in data) {
        return;
      }

      if (typeof window !== undefined) {
        localStorage.setItem("access_token", data.token);
      }

      dispatch(loginSuccess(data.user));
    } catch (error) {
      dispatch(loginFailure("Error"));
    }
  };

export const me = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await instance.get("/user/me");
    dispatch(loginSuccess(data.user));
  } catch (error) {
    dispatch(loginFailure("Server error"));
  }
};
