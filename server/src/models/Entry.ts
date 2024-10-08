import mongoose, { Schema, model } from "mongoose";

import { COLLECTION } from "../utils/constants.js";
import { ITask } from "./Task.js";

export type Status = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export const STATUSES: Status[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export interface IEntry {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  taskId: mongoose.Types.ObjectId | ITask;
  year: number;
  month: number;
  day: number;
  status: Status;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const EntrySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    taskId: { type: Schema.Types.ObjectId, ref: "Task" },
    year: { type: Number, required: true },
    month: { type: Number, required: true },
    day: { type: Number, required: true },
    status: { type: Number, enum: STATUSES, default: 0, required: true },
    notes: String,
  },
  { timestamps: true, collection: COLLECTION.entries },
);

export const Entry = model<IEntry>("Entry", EntrySchema);
