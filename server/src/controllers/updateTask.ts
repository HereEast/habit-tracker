import { Request, Response } from "express";

import { Task } from "../models/Task.js";

// Update status
export async function updateTask(req: Request, res: Response) {
  const { taskId } = req.params;
  const { title } = req.body;

  if (!title) {
    return res.status(500).json({
      message: "Some parameters are missing: newTitle.",
    });
  }

  try {
    await Task.updateOne({ _id: taskId }, { $set: { title } }).exec();

    return res.status(201).json({
      message: "Task title successfully updated.",
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log("🔴 Error:", err.message);

      return res.status(500).json({
        message: "Failed to update Task title.",
      });
    }
  }
}
