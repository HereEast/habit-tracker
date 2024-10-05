import { Request, Response } from "express";
import mongoose from "mongoose";

import { User } from "../models/User.js";
import { Task } from "../models/Task.js";
import { Entry } from "../models/Entry.js";

import { getDaysInMonth } from "../utils/handlers.js";
import { NewEntryData } from "./createTask.js";

// Get User year data
export async function getUserYear(req: Request, res: Response) {
  const { year } = req.params;
  const { userId } = req.body.user._id;

  const today = new Date();
  const currentMonth = today.getMonth() + 1;

  try {
    const user = await User.findById(userId).populate("timeline.months.tasks");
    const yearData = user?.timeline.find((item) => item.year === Number(year));

    const isCurrentMonth = yearData?.months.find((month) => month.month === currentMonth);

    if (isCurrentMonth) {
      return res.json(yearData);
    }

    // TODO: New Year

    // Get active Tasks
    const activeTasks = await Task.find({ userId, stopped: false }).exec();
    const activeTasksID = activeTasks.map((task) => task._id);

    const daysInMonth = getDaysInMonth(currentMonth, Number(year));

    // Create entries for a new month
    activeTasks.forEach(async (task) => {
      for (let i = 1; i <= daysInMonth; i++) {
        const entryData: NewEntryData = {
          userId: new mongoose.Types.ObjectId(userId),
          taskId: task._id,
          year: Number(year),
          month: currentMonth,
          day: i,
          status: 0,
        };

        const entry = new Entry(entryData);
        await entry.save();

        task.entries.push(entry._id);
        await task.save();
      }
    });

    // Push month data to the Timeline
    const monthData = {
      month: currentMonth,
      tasks: activeTasksID,
    };

    yearData?.months.push(monthData);
    await user?.save();

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
