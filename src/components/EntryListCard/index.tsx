import { FC, DragEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Entry } from "@/interface/entry";
import { setIsDragging } from "@/actions/ui";

import styles from "./EntryListCard.module.css";
import { AppDispatch } from "@/store/store";
import uiSlice from "../../store/slices/ui/index";
import { isDraggin } from "@/store/slices/ui";

interface Props {
  entry: Entry;
}

const EntryListCard: FC<Props> = ({ entry }) => {
  const dispatch = useDispatch<AppDispatch>();

  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    dispatch(setIsDragging(true));
    if (entry._id) e.dataTransfer.setData("id", entry._id);
  };

  const onDragEnd = () => {
    dispatch(setIsDragging(false));
  };

  return (
    <div
      className={styles.container}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <h3>{entry.title}</h3>
      <p className="h6">{entry.description}</p>
      <div className={styles.dateContainer}>
        <div>
          <h5 className="h6 dgt">Created at</h5>
          <h5 className="h6 gt">{entry.createdAt}</h5>
        </div>
        <div>
          <h5 className="h6 dgt">Deadline</h5>
          <h5 className="h6 gt">{entry.deadline}</h5>
        </div>
      </div>
    </div>
  );
};

export default EntryListCard;
