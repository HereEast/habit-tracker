import { ITask } from "../models/Task.js";

// Filtered by month
export function filterTasksByMonth(tasks: ITask[], month: number) {
  const monthTasks = tasks.filter((task) => {
    const isEarlierDeleted = task.deletedAt && new Date(task.deletedAt).getMonth() + 1 < month;

    if (isEarlierDeleted) {
      return false;
    }

    return new Date(task.createdAt).getMonth() + 1 <= month;
  });

  return monthTasks;
}

// Filtered by year
export function filterTasksByYear(tasks: ITask[], year: number) {
  const yearTasks = tasks.filter((task) => {
    // Deleted before a given year
    const isEarlierDeleted = task.deletedAt && new Date(task.deletedAt).getFullYear() < year;

    if (isEarlierDeleted) {
      return false;
    }

    // Exclude future tasks
    return new Date(task.createdAt).getFullYear() <= year;
  });

  return yearTasks;
}
