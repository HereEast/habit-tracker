import { Request, Response } from "express";

import { Task } from "../models/Task.js";

export async function getTasksByUserId(req: Request, res: Response) {
  const { userId } = req.params;

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
