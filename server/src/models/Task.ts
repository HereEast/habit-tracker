import { Schema, model } from "mongoose";

import { ID } from "../utils/types.js";

export interface ITask {
  _id: ID;
  userId: ID;
  title: string;
  deleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// stopped: boolean;
// stoppedAt?: Date;
// resumedAt?: Date;

export const TaskSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    entries: [{ type: Schema.Types.ObjectId, ref: "Entry" }],
    // stopped: { type: Boolean, required: true, default: false },
    // stoppedAt: Date,
    // resumedAt: Date,
    deleted: { type: Boolean, required: true, default: false },
    deletedAt: Date,
  },
  { timestamps: true, collection: "tasks" },
);

export const Task = model<ITask>("Task", TaskSchema);
