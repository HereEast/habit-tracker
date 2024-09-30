import { Request, Response } from "express";
import mongoose, { RootFilterQuery } from "mongoose";

import { Entry } from "../models/Entry.js";
import { ITask } from "../models/Task.js";

interface IEntryQuery {
  userId: string; // change to mongoose later
  taskId: mongoose.Types.ObjectId;
  year: number;
  month: number;
  day?: number;
}

// Get task entries
export async function getEntries(req: Request, res: Response) {
  const { userId, taskId, year, month, day } = req.query;

  if (!year || !month) {
    return res.status(500).json({
      message: "Some parameters are missing: year, month.",
    });
  }

  const query: RootFilterQuery<IEntryQuery> = {
    year: Number(year),
    month: month,
  };

  if (userId) {
    query.userId = userId;
  }

  if (taskId) {
    query.taskId = taskId;
  }

  if (day) {
    query.day = Number(day);
  }

  try {
    const entries = await Entry.find(query).populate("taskId").exec();

    const activeEntries = entries.filter((entry) => {
      const activeTask = entry.taskId as ITask;
      return activeTask.stopped === false;
    });

    return res.json(activeEntries);
  } catch (err) {
    if (err instanceof Error) {
      console.log("🔴 Error:", err.message);

      return res.status(500).json({
        message: "Failed to fetch entries.",
      });
    }
  }
}
