import { Request, Response } from "express";

import { ITask, Task } from "../models/Task.js";
import { IEntry } from "../models/Entry.js";

import { getToday } from "../utils/dates.js";
import { filterTasksByMonth, filterTasksByYear } from "../utils/handlers.js";
import { mapPublicTask } from "../utils/mappers.js";

const MAX_MONTHS = 12;

// Get year data
export async function getTimeline(req: Request, res: Response) {
  const { userId, year } = req.query;

  if (!year || !userId) {
    return res.status(500).json({
      message: "Some parameters are missing: userId, year.",
    });
  }

  const { currentMonth, currentYear } = getToday();
  const monthCount = currentYear === Number(year) ? currentMonth : MAX_MONTHS;

  const timeline = new Array(monthCount).fill(0).map((_, i) => {
    return { month: i + 1 };
  });

  try {
    const tasks: ITask[] = await Task.find({ userId }).populate("entries").exec();
    const yearTasks = filterTasksByYear(tasks, Number(year));

    // YEAR DATA
    const yearData = timeline
      .map((item) => {
        const monthTasks = filterTasksByMonth(yearTasks, item.month);

        // Arrange Entries by months of the year
        const mappedTasks = monthTasks.map((task) => {
          const entries = task.entries as IEntry[];

          const monthEntries = entries.filter(
            (entry) => entry.month === item.month && entry.year === Number(year),
          );

          return {
            task: mapPublicTask(task),
            entries: [{ month: item.month, data: monthEntries }],
          };
        });

        return {
          ...item,
          tasks: mappedTasks,
        };
      })
      .filter((data) => data.month === currentMonth || data.tasks.length);

    return res.json(yearData);
  } catch (err) {
    if (err instanceof Error) {
      console.log("🔴 Error:", err.message);

      return res.status(500).json({
        message: "Failed to fetch user's year data.",
      });
    }
  }
}
