import { Request, Response } from "express";

import { Task } from "../models/Task.js";
import { mapTaskWithoutEntries } from "../utils/mappers.js";

export async function updateTask(req: Request, res: Response) {
  const { taskId } = req.params;
  const { title } = req.body;

  if (!taskId || !title) {
    return res.status(500).json({
      message: "Some parameters are missing: taskId, title.",
    });
  }

  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId },
      { $set: { title } },
      { new: true },
    )
      .lean()
      .exec();

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found." });
    }

    const mappedTask = mapTaskWithoutEntries(updatedTask);
    return res.status(201).json(mappedTask);
  } catch (err) {
    if (err instanceof Error) {
      console.log("🔴 Error:", err.message);

      return res.status(500).json({
        message: "Failed to update Task title.",
      });
    }
  }
}
