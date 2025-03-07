import { ITask } from "../models/Task.js";
import { PublicTask } from "./types.js";

export function mapPublicTask(task: ITask): PublicTask {
  return {
    _id: task._id,
    title: task.title,
    deleted: task.deleted,
    deletedAt: task.deletedAt,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  };
}
