import { Request, Response } from "express";
import { RootFilterQuery } from "mongoose";

import { Entry } from "../models/Entry.js";
import { getMonthFromIndex } from "../utils/handlers.js";

interface IEntryQuery {
  userId: string;
  taskId?: string;
  year: number;
  month: string;
  day?: number;
}

// Get entries
export async function getEntries(req: Request, res: Response) {
  const { userId } = req.params;
  const { taskId, year, month, day } = req.query;

  if (!year || !month) {
    return res.status(500).json({
      message: "Some parameters are missing: year, month.",
    });
  }

  const query: RootFilterQuery<IEntryQuery> = {
    userId,
    year: Number(year),
    month: getMonthFromIndex(Number(month)),
  };

  if (taskId) {
    query.taskId = taskId;
  }

  if (day) {
    query.day = Number(day);
  }

  try {
    const entries = await Entry.find(query).exec();

    return res.json(entries);
  } catch (err) {
    if (err instanceof Error) {
      console.log("🔴 Error:", err.message);

      return res.status(500).json({
        message: "Failed to fetch entries.",
      });
    }
  }
}
