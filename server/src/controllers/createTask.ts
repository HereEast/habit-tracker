import { Request, Response } from "express";

import { ITask, Task } from "../models/Task.js";
import { Entry, IEntry } from "../models/Entry.js";
import { getDaysInMonth, getToday } from "../utils/dates.js";
import { mapTask } from "../utils/mappers.js";

export type NewEntryData = Omit<IEntry, "_id">;
export type NewTaskData = Omit<ITask, "_id">;

// Create Task
export async function createTask(req: Request, res: Response) {
  const { title, userId } = req.body;

  try {
    const taskData: NewTaskData = {
      userId,
      title,
      deleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const task = new Task(taskData);
    await task.save();

    // Create Entries for the current month
    const { currentDay, currentMonth, currentYear } = getToday();
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);

    for (let i = currentDay; i <= daysInMonth; i++) {
      const entryData: NewEntryData = {
        userId,
        taskId: task._id,
        year: currentYear,
        month: currentMonth,
        day: i,
        status: 0,
      };

      const entry = new Entry(entryData);
      await entry.save();
    }

    const mappedTask = mapTask(task.toObject());

    return res.status(201).json(mappedTask);
  } catch (err) {
    if (err instanceof Error) {
      console.log("🔴 Error:", err.message);

      return res.status(500).json({
        message: "Failed to create a new task.",
      });
    }
  }
}
