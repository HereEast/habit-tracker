import mongoose, { Schema, model } from "mongoose";

import { COLLECTION } from "../utils/constants.js";

export interface ITask {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  title: string;
  entries: mongoose.Types.ObjectId[];
  stopped: boolean;
  stoppedAt?: Date;
  resumedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const TaskSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    entries: [{ type: Schema.Types.ObjectId, ref: "Entry" }],
    stopped: { type: Boolean, required: true },
    stoppedAt: Date,
    resumedAt: Date,
  },
  { timestamps: true, collection: COLLECTION.tasks },
);

export const Task = model<ITask>("Task", TaskSchema);
