import { Request, Response } from "express";

import { Task } from "../models/Task.js";
import { mapTask } from "../utils/mappers.js";

// Get user Tasks
export async function getTasks(req: Request, res: Response) {
  const { userId } = req.params;

  try {
    const tasks = await Task.find({ userId })
      .select("_id userId title deleted deletedAt createdAt updatedAt")
      .lean()
      .exec();

    const mappedTask = tasks.map(mapTask);

    return res.json(mappedTask);
  } catch (err) {
    if (err instanceof Error) {
      console.log("🔴 Error:", err.message);

      return res.status(500).json({
        message: "Failed to fetch tasks by user ID.",
      });
    }
  }
}
