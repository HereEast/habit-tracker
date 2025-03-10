import { Request, Response } from "express";

import { Entry } from "../models/Entry.js";

// Get month Entries by task
export async function getMonthEntriesByTask(req: Request, res: Response) {
  const { userId, taskId, year, month } = req.query;

  if (!year || !month || !userId || !taskId) {
    return res.status(500).json({
      message: "Some parameters are missing: userId, taskId, year, month.",
    });
  }

  try {
    const entries = await Entry.find({ userId, taskId, year, month }).exec();

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
