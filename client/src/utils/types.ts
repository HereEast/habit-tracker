import { Status } from "~/server/models/Entry";

// APIs
export interface CreateTaskInput {
  userId: string;
  title: string;
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
