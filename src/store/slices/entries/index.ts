"use client";
import { Entry } from "@/interface/entry";
import { createSlice } from "@reduxjs/toolkit";

interface EntriesInitialState {
  entries: Entry[];
  error: string | null;
}

const initialState: EntriesInitialState = {
  entries: [],
  error: null,
};

const entriesSlice = createSlice({
  name: "entries",
  initialState,
  reducers: {
    getEntriesSuccess(state, action) {
      state.entries = action.payload;
    },
    getEntriesFail(state, action) {
      state.error = action.payload;
    },
  },
});

export const { getEntriesSuccess, getEntriesFail } = entriesSlice.actions;
export default entriesSlice.reducer;
