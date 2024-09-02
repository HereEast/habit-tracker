import { Schema, model } from "mongoose";
import { COLLECTION } from "../utils/constants.js";

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  },
  { timestamps: true, collection: "users" },
);

export const User = model("User", UserSchema, COLLECTION.users);
