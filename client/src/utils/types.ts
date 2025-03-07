export interface CreateTaskInput {
  userId: string;
  title: string;
}

export interface UseMonthEntriesByTaskInput {
  userId: string;
  taskId: string;
  year: number;
  month: number;
}
