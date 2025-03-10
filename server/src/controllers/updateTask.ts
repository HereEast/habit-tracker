import { Request, Response } from "express";

import { Task } from "../models/Task.js";

// Delete from the current month (update "deleted" and "deletedAt")
export async function updateTask(req: Request, res: Response) {
  const { taskId } = req.params;

  if (!taskId) {
    return res.status(500).json({
      message: "Some parameters are missing: taskId.",
    });
  }

  try {
    const deletedTask = await Task.findOneAndUpdate(
      { _id: taskId },
      { $set: { deleted: true, deletedAt: new Date() } },
      { new: true },
    ).exec();

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found." });
    }

    return res.status(201).json(deletedTask);
  } catch (err) {
    if (err instanceof Error) {
      console.log("🔴 Error:", err.message);

      return res.status(500).json({
        message: "Failed to update Task title.",
      });
    }
  }
}
