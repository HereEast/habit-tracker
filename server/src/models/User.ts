import mongoose, { Schema, model } from "mongoose";

export interface IUser {
  _id: mongoose.Types.ObjectId;
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
