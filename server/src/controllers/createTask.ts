import mongoose from "mongoose";
import { Request, Response } from "express";

import { ITask, Task } from "../models/Task.js";
import { Entry, IEntry } from "../models/Entry.js";
import { User } from "../models/User.js";
import { getDaysInMonth } from "../utils/handlers.js";

interface CreateTaskRequestProps {
  title: string;
  userId: mongoose.Types.ObjectId;
}

export type NewEntryData = Omit<IEntry, "_id">;
export type NewTaskData = Omit<ITask, "_id" | "createdAt" | "updatedAt">;

// Create Task
export async function createTask(req: Request, res: Response) {
  const { title, userId } = req.body as CreateTaskRequestProps;

  try {
    const taskData: NewTaskData = {
      userId,
      title,
      entries: [],
      stopped: false,
    };

    const task = new Task(taskData);
    await task.save();

    // Create Entries for the current month
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const todayDate = today.getDate();

    const daysInMonth = getDaysInMonth(month, year);

    for (let i = todayDate; i <= daysInMonth; i++) {
      const entryData: NewEntryData = {
        userId,
        taskId: task._id,
        year,
        month,
        day: i,
        status: 0,
      };

      const entry = new Entry(entryData);
      await entry.save();

      task.entries.push(entry._id);
      await task.save();
    }

    // Add Task ID to tasks[]
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found (Create Task)." });
    }

    user.tasks.push(task._id);

    // Update User's timeline
    const timelineYear = user.timeline.find((entry) => entry.year === year);

    if (!timelineYear) {
      const yearEntry = { year, months: [{ month, tasks: [task._id] }] };
      user.timeline.push(yearEntry);
    }

    const timelineMonth = timelineYear?.months.find((mon) => mon.month === month);

    if (!timelineMonth) {
      const monthEntry = { month, tasks: [task._id] };
      timelineYear?.months.push(monthEntry);
    } else {
      timelineMonth?.tasks.push(task._id);
    }

    // Save
    await user.save();

    return res.status(201).json(task);
  } catch (err) {
    if (err instanceof Error) {
      console.log("🔴 Error:", err.message);

      return res.status(500).json({
        message: "Failed to create a new task.",
      });
    }
  }
}
