import mongoose, { Schema, model } from "mongoose";

import { COLLECTION } from "../utils/constants.js";
import { entrySchema, IEntry } from "./Entry.js";

export interface ITask {
  _id?: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  title: string;
  // entries: mongoose.Types.ObjectId[];
  entries: IEntry[];
  paused: boolean;
  pausedAt?: Date;
  resumedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export const TaskSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    // entries: [{ type: Schema.Types.ObjectId, ref: "Entry" }],
    entries: [entrySchema],
    paused: { type: Boolean, required: true },
    pausedAt: Date,
    resumedAt: Date,
  },
  { timestamps: true, collection: COLLECTION.tasks },
);

// Interfaces
// export interface DayStatus {
//   status: StatusType;
//   invalid: boolean;
//   disabled: boolean;
// }

// export type DayData = Record<string, DayStatus>;
// export type MonthData = {
//   [key in MonthType]?: DayData;
// };
// export type YearData = Record<string, MonthData>;

// export interface ITask {
//   _id?: mongoose.Types.ObjectId;
//   userId: mongoose.Types.ObjectId;
//   title: string;
//   timeline: Map<string, YearData>;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// const daySchema = new Schema(
//   {
//     status: { type: Number, enum: STATUS, required: true },
//     invalid: { type: Boolean, required: true },
//     disabled: { type: Boolean, required: true },
//   },
//   { _id: false },
// );

// const monthSchema = new Schema(
//   {
//     days: { type: Map, of: daySchema },
//   },
//   { _id: false },
// );

// const yearSchema = new Schema(
//   {
//     months: { type: Map, of: monthSchema },
//   },
//   { _id: false },
// );

// export const TaskSchema = new Schema(
//   {
//     userId: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     title: {
//       type: String,
//       required: true,
//     },
//     notes: {
//       type: String,
//     },
//     timeline: {
//       type: Map,
//       of: yearSchema,
//     },
//   },
//   { timestamps: true, collection: COLLECTION.tasks },
// );

export const Task = model<ITask>("Task", TaskSchema);
