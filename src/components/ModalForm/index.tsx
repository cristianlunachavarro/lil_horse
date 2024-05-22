import { ChangeEvent, FC, useState } from "react";
import styles from "./ModalForm.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { createEntry } from "../../actions/entries";
import { format } from "date-fns";
import { Entry } from "@/interface/entry";

interface ModalFormProps {
  isOpen: boolean;
  onClose: (arg: boolean) => void;
}

const ModalForm: FC<ModalFormProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    title: "",
    description: "",
    deadline: "",
  });

  const dispatch = useDispatch<AppDispatch>();

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
  };

  const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setDescription(value);
  };

  const handleDeadline = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDeadline(value);
  };

  const validateForm = () => {
    const newErrors: {
      title?: string;
      description?: string;
      deadline?: string;
    } = {};

    if (!title) {
      newErrors.title = "Title is required.";
    } else if (title.length < 10) {
      newErrors.title = "Username must be at least 8 characters long.";
    }

    if (!description) {
      newErrors.description = "Description is required.";
    } else if (description.length < 20) {
      newErrors.description =
        "Description must be at least 20 characters long.";
    }

    if (!deadline) {
      newErrors.deadline = "Deadline is required.";
    } else {
      const selectedDate = new Date(deadline);
      const currentDate = new Date();
      if (selectedDate <= currentDate) {
        newErrors.deadline = "Deadline must be after the current date.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const entry: Entry = {
        title,
        description,
        deadline: format(new Date(deadline), "dd/MM/yy"),
        status: "pending"
      };
      dispatch(createEntry(entry));
      onClose(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.topBarContainer}>
          <h3 className="h3 tmedium">Create Task</h3>
          <button
            className={`${styles.closeButton} wt tstrong`}
            onClick={() => onClose(false)}
          >
            X
          </button>
        </div>
        <div className={styles.inputContainer}>
          <h3 className="dgt tmedium">Title</h3>
          <input
            onChange={handleTitle}
            className={styles.textInput}
            type="text"
            placeholder="Create the home page"
          />
          <div
            className={`${styles.error} ${
              errors.title ? styles.visible : ""
            } h6`}
          >
            {errors.title}
          </div>{" "}
        </div>
        <div className={styles.inputContainer}>
          <h3 className="dgt tmedium">Description</h3>
          <textarea
            onChange={handleDescription}
            className={styles.textInput}
            placeholder="Create the home pageLorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
          />
        </div>
        <div
            className={`${styles.error} ${
              errors.description ? styles.visible : ""
            } h6`}
          >
            {errors.description}
          </div>{" "}

        <div className={styles.inputContainer}>
          <h3 className="dgt tmedium">Deadline</h3>
          <input
            onChange={handleDeadline}
            className={styles.textInput}
            type="date"
          />
                    <div
            className={`${styles.error} ${
              errors.deadline ? styles.visible : ""
            } h6`}
          >
            {errors.deadline}
          </div>{" "}
        </div>

        <button onClick={handleSubmit} className="wt h4">
          Save
        </button>
      </div>
    </div>
  );
};

export default ModalForm;
