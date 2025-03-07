import mongoose, { Schema, model } from "mongoose";

export interface IUser {
  _id: mongoose.Types.ObjectId | string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

// interface ITimeline {
//   year: number;
//   months: { month: number; tasks: mongoose.Types.ObjectId[] }[];
// }

// const MonthSchema = new Schema(
//   {
//     month: Number,
//     tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
//   },
//   { _id: false },
// );

// const YearSchema = new Schema(
//   {
//     year: Number,
//     months: [MonthSchema],
//   },
//   { _id: false },
// );

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    // timeline: [YearSchema],
  },
  { timestamps: true, collection: "users" },
);

export const User = model<IUser>("User", UserSchema, "users");
