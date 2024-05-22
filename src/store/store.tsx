"use client";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import entriesReducer from "./slices/entries";
import uiReducer from "./slices/ui";

const store = configureStore({
  reducer: {
    userReducer,
    entriesReducer,
    uiReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
