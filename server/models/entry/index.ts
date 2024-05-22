import { Schema, model, Document } from "mongoose";

export enum EntryStatus {
  PENDING = "pending",
  INPROGRESS = "in-progress",
  COMPLETED = "finished",
}

interface Entry extends Document {
  userId: Schema.Types.ObjectId; 
  title: string;
  description: string;
  deadline: string;
  completed: boolean;
  categories: string[];
  createdAt: string;
  status: EntryStatus;
}

const entrySchema = new Schema<Entry>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, 
  title: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: String, required: true },
  completed: { type: Boolean, required: true },
  categories: { type: [String], required: false },
  status: { type: String, enum: EntryStatus, required: true },
  createdAt: { type: String, required: true },
});

const EntryModel = model<Entry>("Entry", entrySchema);

export default EntryModel;
