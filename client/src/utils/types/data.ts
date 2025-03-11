export type Status = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type BasicTask = Omit<ITask, "entries">;

export interface MonthTimelineData {
  month: number;
  tasks: {
    task: BasicTask;
    entries: IEntry[];
  }[];
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
  // password: string;
  createdAt: Date;
}
