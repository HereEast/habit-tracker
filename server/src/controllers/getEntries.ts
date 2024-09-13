import { Request, Response } from "express";

import { Entry } from "../models/Entry.js";
import { getMonthFromIndex } from "../utils/handlers.js";

// Month entries by taskId
export async function getMonthEntriesByTaskId(req: Request, res: Response) {
  const { userId, taskId } = req.params;
  const { year, month } = req.query;

  if (!year || !month) {
    return res.status(500).json({
      message: "Some parameters are missing: year, month.",
    });
  }

  try {
    const entries = await Entry.find({
      userId,
      taskId,
      year: Number(year),
      month: getMonthFromIndex(Number(month)),
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

  try {
    const entries = await Entry.find({
      userId,
      year: Number(year),
      month: getMonthFromIndex(Number(month) - 1),
      day: Number(day),
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
