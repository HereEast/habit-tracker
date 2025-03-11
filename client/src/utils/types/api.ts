import { Status } from "./data";

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
