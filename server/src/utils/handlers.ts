import { IEntry } from "../models/Entry.js";
import { ITask } from "../models/Task.js";

// Entries by month
export function getEntriesByMonth(
  entries: IEntry[],
  month: number,
  year: number,
) {
  return entries.filter(
    (entry) => entry.month === month && entry.year === year,
  );
}

// Tasks filtered by month
export function filterTasksByMonth(tasks: ITask[], month: number) {
  return tasks.filter((task) => {
    const createdAtMonth = new Date(task.createdAt).getMonth() + 1;
    const deletedAtMonth = task.deletedAt
      ? new Date(task.deletedAt).getMonth() + 1
      : null;

    const isDeleted = deletedAtMonth !== null && deletedAtMonth < month;
    const isCreated = createdAtMonth <= month;

    return !isDeleted && isCreated;
  });
}

// Tasks filtered by year
export function filterTasksByYear(tasks: ITask[], year: number) {
  return tasks.filter((task) => {
    const createdAtYear = new Date(task.createdAt).getFullYear();
    const deletedAtYear = task.deletedAt
      ? new Date(task.deletedAt).getFullYear()
      : null;

    const isDeleted = deletedAtYear !== null && deletedAtYear < year;
    const isCreated = createdAtYear <= year;

    return !isDeleted && isCreated;
  });
}
