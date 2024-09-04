import mongoose, { Schema, model } from "mongoose";

import { COLLECTION, STATUS } from "../utils/constants.js";
import { MonthType, StatusType } from "../utils/types.js";

// Interfaces
export interface DayStatus {
  status: StatusType;
  invalid: boolean;
  disabled: boolean;
}

export type DayData = Record<string, DayStatus>;
export type MonthData = {
  [key in MonthType]?: DayData;
};
export type YearData = Record<string, MonthData>;

export interface ITask {
  _id?: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  title: string;
  timeline: Map<string, YearData>;
  createdAt?: Date;
  updatedAt?: Date;
}

// Schemas
const daySchema = new Schema(
  {
    status: { type: Number, enum: STATUS, required: true },
    invalid: { type: Boolean, required: true },
    disabled: { type: Boolean, required: true },
  },
  { _id: false },
);

const monthSchema = new Schema(
  {
    days: { type: Map, of: daySchema },
  },
  { _id: false },
);

const yearSchema = new Schema(
  {
    months: { type: Map, of: monthSchema },
  },
  { _id: false },
);

export const TaskSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    timeline: {
      type: Map,
      of: yearSchema,
    },
  },
  { timestamps: true, collection: COLLECTION.tasks },
);

export const Task = model<ITask>("Task", TaskSchema);
