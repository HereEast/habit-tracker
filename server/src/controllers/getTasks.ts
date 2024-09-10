import { Request, Response } from "express";

import { Task } from "../models/Task.js";

// Get all tasks by UserId
export async function getTasksByUserId(req: Request, res: Response) {
  const { userId } = req.params;

  if (!userId) {
    throw new Error("User ID is required.");
  }

  const tasks = await Task.find({ userId }).exec();

  return res.json(tasks);
}

// Get all tasks by UserId
// export async function getMonthTasks(req: Request, res: Response) {
//   const { userId, year, month } = req.params;

//   if (!userId) {
//     throw new Error("User ID is required.");
//   }

//   const tasks = await Task.find({ userId }).exec();

//   const tasksWithFilteredEntries = tasks.map((task) => {
//     const filteredEntries = task.entries.filter((entry) => {
//       const entryYear = entry.date.getFullYear();

//       return entryYear === Number(year);
//     });

//     return {
//       ...task.toObject(),
//       entries: filteredEntries,
//     };
//   });

//   return res.json(tasks);
// }
