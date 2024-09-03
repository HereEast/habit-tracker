import { Schema, model } from "mongoose";

import { COLLECTION, STATUS } from "../utils/constants.js";

const statusSchema = new Schema(
  {
    status: { type: String, enum: STATUS },
    day: Number,
    month: String,
    year: Number,
    invalid: Boolean,
    disabled: Boolean,
  },
  { _id: false },
);

export const TaskSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    data: {
      type: [statusSchema],
      required: true,
    },
    // timeline: {
    //   type: Map,
    //   of: [monthSchema],
    // },
  },
  { timestamps: true, collection: COLLECTION.tasks },
);

export const Task = model("Task", TaskSchema);
