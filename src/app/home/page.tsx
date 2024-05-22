"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";

import EntryList from "@/components/EntryList";
import ModalForm from "@/components/ModalForm";
import Error from "@/components/Error";

import styles from "./HomePage.module.css";

import { getEntries } from "../../actions/entries";
import { logoutUser } from "@/actions/user";
import useAuthentication from "@/hooks/useAuthentication";
//TODO revisar los tags h2
const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.userReducer.user);

  useAuthentication()

  useEffect(() => {
    dispatch(getEntries());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleModal = (value: boolean) => {
    setOpenModal(value);
  };

  useEffect(() => {
    console.log(user)
    if (Object.keys(user).length === 0) {
      location.replace("/login");
    }
  }, [user]);

  return (
    <div className={styles.background}>
      <div className={styles.barContainer}>
        <div className="h3 tstrong">Home Page</div>
        <button className="wt h4" onClick={() => handleModal(true)}>
          Add Task
        </button>
        <button onClick={handleLogout}>logout</button>
      </div>
      <div className={styles.entriesContainer}>
        <div className={styles.columns}>
          <h2 className="h4 tmedium">Pending</h2>
          <EntryList status="pending" />
        </div>
        <div className={styles.columns}>
          <h2 className="h4 tmedium">In-progress</h2>
          <EntryList status="in-progress" />
        </div>
        <div className={styles.columns}>
          <h2 className="h4 tmedium">Completed</h2>
          <EntryList status="finished" />
        </div>
      </div>
      <ModalForm isOpen={openModal} onClose={handleModal} />
      <Error />
    </div>
  );
};

export default HomePage;
