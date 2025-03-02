import { ITask } from "~/server/models/Task";

export interface IMonthData {
  month: number;
  tasks: ITask[];
}

export interface IYearData {
  year: number;
  months: IMonthData[];
}
