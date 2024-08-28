import mongoose, { InferSchemaType } from "mongoose";
import { STATUS } from "~/utils/constants";

export const TaskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  title: { type: String, required: true },
  status: { type: String, enum: STATUS, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: false },
  deletedAt: { type: Date, required: false },
});

type TaskType = InferSchemaType<typeof TaskSchema>;

export const Task = mongoose.model<TaskType>("Task", TaskSchema);
