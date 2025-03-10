import { Status } from "~/server/models/Entry";

// APIs
export interface CreateTaskInput {
  userId: string;
  title: string;
}

export interface DeleteTaskInput {
  taskId: string;
  createdAt: Date;
}

export interface UpdateEntryInput {
  entryId: string;
  status: Status;
}

// Hooks
export interface UseMonthEntriesByTaskInput {
  userId: string;
  taskId: string;
  year: number;
  month: number;
}

// Models
export interface IEntry {
  _id: string;
  userId: string;
  taskId: string | ITask;
  year: number;
  month: number;
  day: number;
  status: Status;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITask {
  _id: string;
  userId: string;
  title: string;
  entries: (string | IEntry)[];
  deleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}
