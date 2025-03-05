import mongoose, { Schema, model } from "mongoose";
import { IEntry } from "./Entry.js";

export interface ITask {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  title: string;
  // entries: mongoose.Types.ObjectId[] | IEntry[];
  stopped: boolean;
  stoppedAt?: Date;
  resumedAt?: Date;
  deleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const TaskSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    // entries: [{ type: Schema.Types.ObjectId, ref: "Entry" }],
    stopped: { type: Boolean, required: true, default: false },
    stoppedAt: Date,
    resumedAt: Date,
    deleted: { type: Boolean, required: true, default: false },
    deletedAt: Date,
  },
  { timestamps: true, collection: "tasks" },
);

export const Task = model<ITask>("Task", TaskSchema);
