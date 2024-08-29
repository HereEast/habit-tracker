import { InferSchemaType, Schema, model } from "mongoose";

import { COLLECTION, STATUS } from "../utils/constants.js";

export const TaskSchema = new Schema(
  {
    // user: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    //   unique: true,
    // },
    title: { type: String, required: true },
    status: { type: String, enum: STATUS, required: true },
    createdAt: { type: Date, default: new Date(), required: true },
    updatedAt: { type: Date, required: false },
    deletedAt: { type: Date, required: false },
  },
  { timestamps: true, collection: COLLECTION.tasks },
);

export type TaskType = InferSchemaType<typeof TaskSchema>;

export const Task = model<TaskType>("Task", TaskSchema);
