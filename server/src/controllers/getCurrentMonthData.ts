import { Request, Response } from "express";

import { ITask, Task } from "../models/Task.js";
import { IEntry } from "../models/Entry.js";

import {
  filterTasksByMonth,
  filterTasksByYear,
  getEntriesByMonth,
} from "../utils/handlers.js";

import { getToday } from "../utils/dates.js";
import { mapEntry, mapTask } from "../utils/mappers.js";
import { MonthTimelineData } from "../utils/types.js";

// Get Timeline
export async function getCurrentMonthData(req: Request, res: Response) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(500).json({
      message: "Some parameters are missing: userId.",
    });
  }

  const { currentMonth, currentYear } = getToday();

  try {
    const tasks: ITask[] = await Task.find({ userId })
      .populate("entries")
      .lean() // Converts to plain object
      .exec();

    const yearTasks = filterTasksByYear(tasks, currentYear);
    const monthTasks = filterTasksByMonth(yearTasks, currentMonth);

    const data = monthTasks.map((task) => {
      const entries = task.entries as IEntry[];

      const monthEntries = getEntriesByMonth(
        entries,
        currentMonth,
        currentYear,
      );

      const mappedTask = mapTask(task);
      const mappedEntries = monthEntries.map(mapEntry);

      return {
        task: mappedTask,
        entries: mappedEntries,
      };
    });

    const currentMonthData: MonthTimelineData = {
      month: currentMonth,
      tasks: data,
    };

    return res.json(currentMonthData);
  } catch (err) {
    if (err instanceof Error) {
      console.log("🔴 Error:", err.message);

      return res.status(500).json({
        message: "Failed to fetch user's year data.",
      });
    }
  }
}
