import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { cleanErrorMessage } from "@/actions/ui";
import { AppDispatch, RootState } from "@/store/store";

import styles from "./Error.module.css";
const Error = () => {
  const dispatch = useDispatch<AppDispatch>();
  const errorMessage = useSelector((state: RootState) => state.uiReducer.error);
  console.log({ errorMessage });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(!!errorMessage);

    const timeoutId = setTimeout(() => {
      dispatch(cleanErrorMessage());
      setIsVisible(false);
    }, 4000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [cleanErrorMessage, errorMessage]);

  return (
    isVisible && (
      <div className={`${styles.errorMessage} ${styles.show}`}>
        <p>{errorMessage}</p>
      </div>
    )
  );
};

export default Error;
