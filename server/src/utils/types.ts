import { IEntry } from "../models/Entry.js";
import { ITask } from "../models/Task.js";

// export type IdType<T = string> = T | mongoose.Types.ObjectId | string;
export type IdType<T = string> = T | string;
export type MonthTimelineTask = Omit<ITask, "entries">;

export interface MonthTimelineData {
  month: number;
  tasks: {
    task: MonthTimelineTask;
    entries: IEntry[];
  }[];
}

export type Timeline = MonthTimelineData[];
