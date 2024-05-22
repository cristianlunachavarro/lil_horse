import { Dispatch } from "redux";

import instance from "@/axiosInstance";
import { getEntriesSuccess, getEntriesFail } from "@/store/slices/entries";
import { Entry } from "@/interface/entry";

export const getEntries = () => async (dispatch: Dispatch) => {
  try {
    const { data }: { data: Entry[] } = await instance.get("/entry");
    if ("error" in data) {
      dispatch(getEntriesFail(data.error));
    }
    dispatch(getEntriesSuccess(data));
  } catch (error) {
    dispatch(getEntriesFail(error));
    console.error("Error fetching entries:", error);
  }
};

export const createEntry = (entry: Entry) => async (dispatch: Dispatch) => {
  const { title, description, deadline, finished, categories, status } = entry;
  try {
    const { data }: { data: Entry[] } = await instance.post("/entry", {
      title,
      description,
      deadline,
      finished,
      categories,
      status,
    });
    if ("error" in data) {
      dispatch(getEntriesFail(data.error));
    }
    dispatch(getEntriesSuccess(data));
  } catch (error) {
    console.error("Error creating entries:", error);
  }
};

export const updateEntry = (entry: Entry) => async (dispatch: Dispatch) => {
  try {
    const { data }: { data: Entry } = await instance.put("entry", entry);
    if ("error" in data) {
      dispatch(getEntriesFail(data.error));
    }
    dispatch(getEntriesSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(getEntriesFail(error));
    console.error("Error updating entries:", error);
  }
};
