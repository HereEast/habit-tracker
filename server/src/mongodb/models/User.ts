import mongoose, { InferSchemaType } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  },
  { timestamps: true },
);

type UserType = InferSchemaType<typeof UserSchema>;

export const User = mongoose.model<UserType>("User", UserSchema);
