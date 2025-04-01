import { IEntry } from "../models/Entry.js";
import { ITask } from "../models/Task.js";
import { IUser } from "../models/User.js";

export function mapEntry(entry: IEntry) {
  return {
    ...entry,
    _id: String(entry._id),
    taskId: String(entry.taskId),
    userId: String(entry.userId),
  };
}

export function mapUser(user: IUser) {
  return {
    ...user,
    _id: String(user?._id),
  };
}

export function mapTask(task: ITask) {
  return {
    ...task,
    _id: String(task._id),
    userId: String(task._id),
  };
}
