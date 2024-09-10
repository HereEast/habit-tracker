import { Request, Response } from "express";

import { Entry } from "../models/Entry.js";

// Month entries by taskId
export async function getMonthEntriesByTaskId(req: Request, res: Response) {
  const { userId, taskId, year, month } = req.params;

  if (!taskId || !userId || !year || !month) {
    throw new Error("Some parameters are missing: userId, taskId, year, month.");
  }

  const parsedYear = Number(year);
  const parsedMonth = Number(month);

  const startOfMonth = new Date(parsedYear, parsedMonth - 1, 1);
  const endOfMonth = new Date(parsedYear, parsedMonth, 0, 23, 59, 59, 999);

  const entries = await Entry.find({
    userId,
    taskId,
    createdAt: { $gte: startOfMonth, $lte: endOfMonth },
  }).exec();

  return res.json(entries);
}

// Get all daily entries
export async function getAllDailyEntries(req: Request, res: Response) {
  const { userId, year, month, day } = req.params;

  if (!userId || !year || !month || !day) {
    throw new Error("Some parameters are missing: userId, year, month, day.");
  }

  const parsedYear = Number(year);
  const parsedMonth = Number(month) - 1;
  const parsedDay = Number(day);

  const startOfDay = new Date(parsedYear, parsedMonth, parsedDay);
  const endOfDay = new Date(parsedYear, parsedMonth, parsedDay + 1);

  try {
    const entries = await Entry.find({
      userId,
      entryDate: { $gte: startOfDay, $lt: endOfDay },
    }).exec();

    return res.json(entries);
  } catch (err) {
    console.error("Error fetching daily entries:", err);

    return res.status(500).json({
      message: "Internal server error in getAllDailyEntries().",
    });
  }
}
