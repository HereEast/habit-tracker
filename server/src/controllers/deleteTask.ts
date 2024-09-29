import mongoose, { Error } from "mongoose";
import { Request, Response } from "express";

import { Task } from "../models/Task.js";
import { User } from "../models/User.js";

// Delete task by ID
export async function deleteTask(req: Request, res: Response) {
  const { userId, taskId } = req.params;

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  try {
    const user = await User.findById(userId).exec();

    if (!user) {
      return res.status(404).json({ message: "User was not found while deleting a task." });
    }

    const taskObjectId = new mongoose.Types.ObjectId(taskId);

    // Delete from the current month
    const timelineYear = user.timeline.find((entry) => entry.year === currentYear);
    const timelineMonth = timelineYear?.months.find((mon) => mon.month === currentMonth + 1);

    if (!timelineMonth) {
      return;
    }

    const updatedTasks = timelineMonth.tasks.filter((id) => !id.equals(taskObjectId));
    timelineMonth.tasks = updatedTasks;

    await user.save();

    // Set stopped flag and stoppedAt date
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task was not found while deleting a task." });
    }

    task.stopped = true;
    task.stoppedAt = today;

    await task.save();

    return res.status(201).json({
      message: `Task with ID ${taskId} was deleted from the current month.`,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log("🔴 Error:", err.message);

      return res.status(500).json({
        message: "Failed to delete the task.",
      });
    }
  }
}
