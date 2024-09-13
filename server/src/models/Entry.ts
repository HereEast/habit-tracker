import mongoose from "mongoose";

import { COLLECTION, STATUS } from "../utils/constants.js";
import { StatusType } from "../utils/types.js";

export interface IEntry {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  taskId: mongoose.Types.ObjectId;
  year: number;
  month: string;
  day: number;
  status: StatusType;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const EntrySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
    year: { type: Number, required: true },
    month: { type: String, required: true },
    day: { type: Number, required: true },
    status: { type: Number, enum: STATUS, default: 0, required: true },
    notes: String,
  },
  { timestamps: true, collection: COLLECTION.entries },
);

export const Entry = mongoose.model<IEntry>("Entry", EntrySchema);
