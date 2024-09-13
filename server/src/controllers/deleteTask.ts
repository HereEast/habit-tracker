import mongoose, { Error } from "mongoose";
import { Request, Response } from "express";

import { Task } from "../models/Task.js";
import { Entry } from "../models/Entry.js";
import { User } from "../models/User.js";

// Delete task by ID
export async function deleteTaskById(req: Request, res: Response) {
  const { userId, taskId } = req.params;

  try {
    await Task.deleteOne({ _id: taskId }).exec();
    await Entry.deleteMany({ taskId }).exec();

    const user = await User.findById(userId).exec();

    if (!user) {
      return res.status(404).json({ message: "User not found while deleting a task." });
    }

    const mongoTaskId = new mongoose.Types.ObjectId(taskId);
    const updatedTasks = user.tasks.filter((id) => !id.equals(mongoTaskId));

    user.tasks = updatedTasks;
    await user.save();

    return res.status(201).json({
      message: `Task with ID ${taskId} is deleted.`,
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
