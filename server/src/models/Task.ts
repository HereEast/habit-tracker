import { Schema, model } from "mongoose";

import { COLLECTION, STATUS } from "../utils/constants.js";

export const TaskSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    data: [
      {
        status: { type: String, enum: STATUS, default: "0" },
        date: { type: Date, default: new Date() },
      },
    ],
    // createdAt: { type: Date, default: new Date(), required: true },
    // updatedAt: { type: Date, required: false },
  },
  { timestamps: true, collection: COLLECTION.tasks },
);

export const Task = model("Task", TaskSchema);
