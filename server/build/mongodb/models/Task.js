import { Schema, model } from "mongoose";
import { STATUS } from "../../utils/constants/index.js";
export const TaskSchema = new Schema({
    // user: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    //   unique: true,
    // },
    title: { type: String, required: true },
    status: { type: String, enum: STATUS, default: "0", required: true },
    createdAt: { type: Date, default: new Date(), required: true },
    updatedAt: { type: Date, required: false },
    deletedAt: { type: Date, required: false },
});
export const Task = model("Task", TaskSchema);
