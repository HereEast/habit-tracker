import { Request, Response } from "express";
import mongoose from "mongoose";

import { ITask, Task } from "../models/Task.js";
import { Entry, IEntry } from "../models/Entry.js";
import { User } from "../models/User.js";
import { getDaysInMonth, getMonthFromIndex } from "../utils/handlers.js";

interface CreateTaskRequestProps {
  title: string;
  userId: mongoose.Types.ObjectId;
}

type NewEntryData = Omit<IEntry, "_id">;

export async function createTask(req: Request, res: Response) {
  const { title, userId } = req.body as CreateTaskRequestProps;

  try {
    // New Task
    const taskData: ITask = {
      userId,
      title,
      entries: [],
      paused: false,
    };

    const task = new Task(taskData);
    await task.save();

    // Create month's entries
    const today = new Date();
    const year = today.getFullYear();
    const monthIndex = today.getMonth();
    const todayDate = today.getDate();

    const daysInMonth = getDaysInMonth(monthIndex + 1, year);

    for (let i = todayDate; i <= daysInMonth; i++) {
      const entryData: NewEntryData = {
        userId,
        taskId: task._id,
        year,
        month: getMonthFromIndex(monthIndex),
        day: i,
        status: 0,
      };

      const entry = new Entry(entryData);
      await entry.save();

      task.entries.push(entry._id);
      // task.entries.push(entryData);
      await task.save();
    }

    // Push TaskID to User's tasks[]
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found while creating new task." });
    }

    user.tasks.push(task._id);
    await user.save();

    return res.status(201).json(task);
  } catch (err) {
    if (err instanceof Error) {
      console.log("🔴 Error:", err.message);

      return res.status(500).json({
        message: "Failed to create new task.",
      });
    }
  }
}
