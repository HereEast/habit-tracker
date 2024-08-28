import { InferSchemaType, Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  },
  { timestamps: true },
);

export type UserType = InferSchemaType<typeof UserSchema>;

export const User = model<UserType>("User", UserSchema);
