import { Schema, model } from "mongoose";
import { ID } from "../utils/types.js";

export interface IUser {
  _id: ID;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true, collection: "users" },
);

export const User = model<IUser>("User", UserSchema, "users");
