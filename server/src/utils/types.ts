import { IEntry } from "../models/Entry.js";
import { ITask } from "../models/Task.js";

export type PublicTask = Omit<ITask, "entries" | "userId">;

export interface MonthTimelineData {
  month: number;
  tasks: {
    task: PublicTask;
    entries: IEntry[];
  }[];
}

export type Timeline = MonthTimelineData[];
