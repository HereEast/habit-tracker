import { IEntry } from "~/server/models/Entry";
import { ITask } from "~/server/models/Task";

export interface IMonthData {
  month: number;
  tasks: ITask[];
}

export interface IYearData {
  year: number;
  months: IMonthData[];
}

//
export type PublicTask = Omit<ITask, "entries">;

export interface MonthTimelineData {
  month: number;
  tasks: {
    task: PublicTask;
    entries: {
      month: number;
      data: IEntry[];
    }[];
  }[];
}

export interface CreateTaskInput {
  userId: string;
  title: string;
}

export interface MonthEntriesByTaskInput {
  userId: string;
  taskId: string;
  year: number;
  month: number;
}
