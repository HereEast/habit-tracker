import { ITask } from "../models/Task.js";

export function mapPublicTask(task: ITask) {
  return {
    _id: task._id,
    title: task.title,
    deleted: task.deleted,
    deletedAt: task.deletedAt,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  };
}
