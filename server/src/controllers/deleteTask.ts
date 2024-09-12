import mongoose, { Error } from "mongoose";
import { Request, Response } from "express";

import { Task } from "../models/Task.js";
import { Entry } from "../models/Entry.js";
import { User } from "../models/User.js";

// Delete task by ID
export async function deleteTaskById(req: Request, res: Response) {
  const { userId, taskId } = req.params;

  if (!userId || !taskId) {
    throw new Error("Parameters are required: userId and taskId.");
  }

  try {
    await Task.deleteOne({ _id: taskId }).exec(); // findByIdAndDelete
    await Entry.deleteMany({ taskId }).exec();

    const user = await User.findById(userId).exec();

    if (!user) {
      throw new Error("User not found.");
    }

    const mongoTaskId = new mongoose.Types.ObjectId(taskId);
    const updatedTasks = user.tasks.filter((id) => !id.equals(mongoTaskId));

    user.tasks = updatedTasks;
    await user.save();

    return res.status(201).json({
      message: `Task with ID ${taskId} is deleted.`,
    });
  } catch (error) {
    // console.error(error);
    handleError(res, "Can't delete task. Something went wrong.");
  }
}

function handleError(res: Response, error: string) {
  res.status(500).json({ error });
}
