import { FC, useMemo, DragEvent } from "react";
import EntryListCard from "../EntryListCard";
import confetti from "canvas-confetti";

import { Entry, EntryStatus } from "@/interface/entry";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { isValidTransition } from "@/utils/entry";
import { updateEntry } from "@/actions/entries";
import { setErrorMessage, setIsDragging } from "@/actions/ui";

interface Props {
  status: EntryStatus;
}

const EntryList: FC<Props> = ({ status }) => {
  const dispatch = useDispatch<AppDispatch>();
  const entries = useSelector(
    (state: RootState) => state.entriesReducer.entries
  );
  console.log;

  const isDraggin = useSelector(
    (state: RootState) => state.uiReducer.isDraggin
  );

  const allowDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDropEntry = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("id");
    const entry = entries.find((e: Entry) => e._id === id);
    if (!entry) return;
    if (isValidTransition(entry?.status, status)) {
      const updatedEntry = { ...entry, status };
      if (updatedEntry.status === "finished") {
        confetti({
          zIndex: 999,
          particleCount: 200,
          spread: 200,
          angle: -70,
          origin: {
            x: 0.95,
            y: 0,
          },
        });
      }
      dispatch(updateEntry(updatedEntry));
    } else {
      dispatch(setErrorMessage("This transition is not allowed"));
    }
    dispatch(setIsDragging(false));
  };

  const entriesByStatus = useMemo(() => {
    return entries.filter((e: Entry) => e.status === status);
  }, [entries]);
  return (
    <div
      id={status}
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      style={{ height: "100%" }}
    >
      {entriesByStatus.map((e: Entry) => (
        <EntryListCard key={e._id} entry={e} />
      ))}
    </div>
  );
};

export default EntryList;
