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

// Task wo entries
export function mapTaskWithoutEntries(task: ITask) {
  return {
    ...task,
    _id: String(task._id),
    userId: String(task._id),
  };
}

// Task w entries
export function mapTask(task: ITask) {
  const { entries, ...rest } = task;

  const mappedEntries = (entries as IEntry[]).map(mapEntry);

  return {
    ...rest,
    _id: String(rest._id),
    userId: String(rest._id),
    entries: mappedEntries,
  };
}
