"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      console.log("action", action.payload);
      state.user = action.payload;
      state.error = "";
    },
    loginFailure(state, action) {
      state.user = {};
      state.error = action.payload;
    },
    logoutSuccess(state) {
      state.user = {};
    },
  },
});

export const { loginSuccess, loginFailure, logoutSuccess } = userSlice.actions;
export default userSlice.reducer;
