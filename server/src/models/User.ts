import mongoose, { Schema, model } from "mongoose";

import { COLLECTION } from "../utils/constants.js";

export interface IUser {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  tasks: mongoose.Types.ObjectId[];
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
