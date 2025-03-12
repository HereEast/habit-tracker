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

export interface CreateUserInput {
  username: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}
