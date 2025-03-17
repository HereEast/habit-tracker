import { Request, Response } from "express";

import { Task } from "../models/Task.js";
import { mapTaskWithoutEntries } from "../utils/mappers.js";

// Update "deleted" and "deletedAt"
export async function deleteFromCurrentMonth(req: Request, res: Response) {
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
    )
      .lean()
      .exec();

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found." });
    }

    const mappedTask = mapTaskWithoutEntries(deletedTask);

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
