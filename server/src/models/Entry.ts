import mongoose from "mongoose";

import { COLLECTION, STATUS } from "../utils/constants.js";
import { StatusType } from "../utils/types.js";

export interface IEntry {
  userId: mongoose.Types.ObjectId;
  taskId: mongoose.Types.ObjectId;
  date: Date;
  status: StatusType;
  notes?: string;
}

export const entrySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
    date: { type: Date, required: true },
    status: { type: Number, enum: STATUS, default: 0, required: true },
    notes: String,
  },
  // { _id: false },
  { timestamps: true, collection: COLLECTION.entries },
);

export const Entry = mongoose.model<IEntry>("Entry", entrySchema);
