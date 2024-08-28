import mongoose, { InferSchemaType } from "mongoose";

type StatusType = "0" | "10" | "20" | "30" | "40" | "50" | "60" | "70" | "80" | "90" | "100";
const STATUS: StatusType[] = ["0", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100"];

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

export default mongoose.model<TaskType>("User", TaskSchema);
