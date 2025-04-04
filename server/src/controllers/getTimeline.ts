import { Request, Response } from "express";

import { Task } from "../models/Task.js";
import { Entry } from "../models/Entry.js";

import { filterTasksByMonth, filterTasksByYear } from "../utils/handlers.js";

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
    const tasks = await Task.find({ userId }).lean().exec();

    const yearTasks = filterTasksByYear(tasks, Number(year));
    const yearTimeline: Timeline = [];

    for (const item of timeline) {
      const { month } = item;

      const monthTasks = filterTasksByMonth(yearTasks, month);

      if (monthTasks.length) {
        const data = await Promise.all(
          monthTasks.map(async (task) => {
            const taskEntries = await Entry.find({
              userId,
              taskId: task._id,
              month,
              year: Number(year),
            })
              .lean()
              .exec();

            return {
              task: mapTask(task),
              entries: taskEntries.map(mapEntry),
            };
          }),
        );

        if (data.length) {
          yearTimeline.push({ month, tasks: data });
        }
      }
    }

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
