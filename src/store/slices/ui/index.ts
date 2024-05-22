"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDraggin: false,
  error: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    isDraggin(state, action) {
      state.isDraggin = action.payload;
    },
    errorMessage(state, action) {
      state.error = action.payload;
    },
  },
});

export const { isDraggin, errorMessage } = uiSlice.actions;
export default uiSlice.reducer;
