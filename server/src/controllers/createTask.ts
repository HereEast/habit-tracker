import { Request, Response } from "express";
import mongoose from "mongoose";

import { ITask, Task } from "../models/Task.js";
import { Entry, IEntry } from "../models/Entry.js";
import { User } from "../models/User.js";
import { getDaysInMonth } from "../utils/handlers.js";

interface CreateTaskRequestProps {
  title: string;
  userId: mongoose.Types.ObjectId;
}

export async function createTask(req: Request, res: Response) {
  const { title, userId } = req.body as CreateTaskRequestProps;

  if (!title) {
    throw new Error("Title is required, and it should be a string.");
  }

  if (!userId) {
    throw new Error("UserId is missing when creating a new task.");
  }

  try {
    // Create Task
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
      const entryDate = new Date(Date.UTC(year, monthIndex, i));

      const dailyEntry: IEntry = {
        userId,
        taskId: task._id,
        date: entryDate,
        status: 0,
      };

      const entry = new Entry(dailyEntry);
      await entry.save();

      task.entries.push(entry._id);
      await task.save();
    }

    // Push TaskID to User's tasks[]
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    user.tasks.push(task._id);
    await user.save();

    return res.status(201).json(task);
  } catch (err) {
    console.log("Error", err);
  }
}
