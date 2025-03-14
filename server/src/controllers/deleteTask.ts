import { Error } from "mongoose";
import { Request, Response } from "express";

import { Task } from "../models/Task.js";
import { Entry } from "../models/Entry.js";
import { mapTaskWithoutEntries } from "../utils/mappers.js";

// Delete task by ID (forever)
export async function deleteTask(req: Request, res: Response) {
  const { taskId } = req.params;

  if (!taskId) {
    return res.status(500).json({
      message: "Some parameters are missing: taskId.",
    });
  }

  try {
    const deletedTask = await Task.findOneAndDelete({ _id: taskId })
      .lean()
      .exec();

    await Entry.deleteMany({ taskId });

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found." });
    }

    const mappedTask = mapTaskWithoutEntries(deletedTask);

    return res.status(201).json(mappedTask);
  } catch (err) {
    if (err instanceof Error) {
      console.log("🔴 Error:", err.message);

      return res.status(500).json({
        message: "Failed to delete the task.",
      });
    }
  }
}
