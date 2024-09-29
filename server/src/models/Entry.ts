import mongoose from "mongoose";

import { COLLECTION } from "../utils/constants.js";

export type Status = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export const STATUSES: Status[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export interface IEntry {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  taskId: mongoose.Types.ObjectId;
  year: number;
  // month: string;
  month: number;
  day: number;
  status: Status;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const EntrySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
    year: { type: Number, required: true },
    // month: { type: String, required: true },
    month: { type: Number, required: true },
    day: { type: Number, required: true },
    status: { type: Number, enum: STATUSES, default: 0, required: true },
    notes: String,
  },
  { timestamps: true, collection: COLLECTION.entries },
);

export const Entry = mongoose.model<IEntry>("Entry", EntrySchema);
