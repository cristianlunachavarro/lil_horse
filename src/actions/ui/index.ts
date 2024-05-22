import { Dispatch } from "redux";
import { isDraggin, errorMessage } from "@/store/slices/ui";

export const setIsDragging = (value: boolean) => (dispatch: Dispatch) => {
  dispatch(isDraggin(value));
};

export const setErrorMessage = (error: string) => (dispatch: Dispatch) => {
  console.log({error})
  dispatch(errorMessage(error));
};

export const cleanErrorMessage = () => (dispatch: Dispatch) => {
  dispatch(errorMessage(null));
};
