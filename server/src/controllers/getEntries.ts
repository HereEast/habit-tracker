import { Request, Response } from "express";

import { Entry } from "../models/Entry.js";

// Month entries by taskId
export async function getMonthEntriesByTaskId(req: Request, res: Response) {
  const { userId, taskId } = req.params;
  const { year, month } = req.query;

  if (!year || !month) {
    return res.status(500).json({
      message: "Some parameters are missing: year, month.",
    });
  }

  const parsedYear = Number(year);
  const parsedMonth = Number(month);

  const startOfMonth = new Date(parsedYear, parsedMonth - 1, 1);
  const endOfMonth = new Date(parsedYear, parsedMonth, 0, 23, 59, 59, 999);

  try {
    const entries = await Entry.find({
      userId,
      taskId,
      createdAt: { $gte: startOfMonth, $lte: endOfMonth },
    }).exec();

    return res.json(entries);
  } catch (err) {
    if (err instanceof Error) {
      console.log("🔴 Error:", err.message);

      return res.status(500).json({
        message: "Failed to fetch month entries by task ID.",
      });
    }
  }
}

// Get all daily entries
export async function getUserEntriesByDay(req: Request, res: Response) {
  const { userId } = req.params;
  const { year, month, day } = req.query;

  if (!year || !month || !day) {
    return res.status(500).json({
      message: "Some parameters are missing: year, month, day.",
    });
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

    return res.status(200).json(entries);
  } catch (err) {
    if (err instanceof Error) {
      console.log("🔴 Error:", err.message);

      return res.status(500).json({
        message: "Failed to fetch user's entries by day.",
      });
    }
  }
}
