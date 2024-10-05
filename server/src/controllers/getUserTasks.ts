import { Request, Response } from "express";

import { Task } from "../models/Task.js";

// Get user Tasks
export async function getUserTasks(req: Request, res: Response) {
  const { userId } = req.body.user._id;

  try {
    const tasks = await Task.find({ userId }).exec();

    return res.json(tasks);
  } catch (err) {
    if (err instanceof Error) {
      console.log("🔴 Error:", err.message);

      return res.status(500).json({
        message: "Failed to fetch tasks by user ID.",
      });
    }
  }
}
