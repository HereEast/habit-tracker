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
import { Timeline } from "../utils/types.js";

const MAX_MONTHS = 12;

// Get Timeline
export async function getTimeline(req: Request, res: Response) {
  const { userId, year } = req.query;

  if (!year || !userId) {
    return res.status(500).json({
      message: "Some parameters are missing: userId, year.",
    });
  }

  const { currentMonth, currentYear } = getToday();

  // Excluding current month
  const monthCount =
    currentYear === Number(year) ? currentMonth - 1 : MAX_MONTHS;

  const timeline = Array.from({ length: monthCount }, (_, i) => {
    return { month: i + 1 };
  }).reverse();

  try {
    const tasks: ITask[] = await Task.find({ userId })
      .populate("entries")
      .lean()
      .exec();

    const yearTasks = filterTasksByYear(tasks, Number(year));

    // YEAR TIMELINE
    const yearTimeline: Timeline = timeline.reduce((acc, { month }) => {
      const monthTasks = filterTasksByMonth(yearTasks, month);

      const data = monthTasks.map((task) => {
        const entries = task.entries as IEntry[];
        const monthEntries = getEntriesByMonth(entries, month, Number(year));

        const mappedTask = mapTask(task);
        const mappedEntries = monthEntries.map(mapEntry);

        return {
          task: mappedTask,
          entries: mappedEntries,
        };
      });

      if (data.length) {
        acc.push({ month, tasks: data });
      }

      return acc;
    }, [] as Timeline);

    return res.json(yearTimeline);
  } catch (err) {
    if (err instanceof Error) {
      console.log("🔴 Error:", err.message);

      return res.status(500).json({
        message: "Failed to fetch user's year data.",
      });
    }
  }
}
