import { Request, Response } from "express";

import { Entry } from "../models/Entry.js";

// Get Entries by TaskId
export async function getTaskEntriesByMonth(req: Request, res: Response) {
  const { userId, taskId, year, month } = req.params;

  if (!taskId || !userId || !year) {
    throw new Error("Some parameters are missing: userId, taskId, year.");
  }

  const startOfMonth = new Date(Number(year), Number(month) - 1, 1);
  const endOfMonth = new Date(Number(year), Number(month), 0, 23, 59, 59, 999);

  const entries = await Entry.find({
    userId,
    taskId,
    createdAt: { $gte: startOfMonth, $lte: endOfMonth },
  }).exec();

  return res.json(entries);
}
