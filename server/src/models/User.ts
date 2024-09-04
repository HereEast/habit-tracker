import { Schema, model } from "mongoose";
import { COLLECTION } from "../utils/constants.js";
import { ITask } from "./Task.js";

export interface IUser {
  username: string;
  email: string;
  password: string;
  // tasks: mongoose.Types.ObjectId[];
  tasks: ITask[];
}

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  },
  { timestamps: true, collection: "users" },
);

export const User = model<IUser>("User", UserSchema, COLLECTION.users);
