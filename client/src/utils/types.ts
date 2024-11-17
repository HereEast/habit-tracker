export type Status = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export const STATUSES: Status[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export interface IEntry {
  _id: string;
  userId: string;
  taskId: string | ITask;
  year: number;
  month: number;
  day: number;
  status: Status;
  notes?: string;
  createdAt?: Date; // string?
  updatedAt?: Date;
}

export interface ITask {
  _id: string;
  userId: string;
  title: string;
  entries: string[];
  stopped: boolean;
  stoppedAt?: Date;
  resumedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  tasks: string[];
  timeline: ITimeline[];
  createdAt: Date;
}

export interface ITimeline {
  year: number;
  months: { month: number; tasks: string[] }[];
}
