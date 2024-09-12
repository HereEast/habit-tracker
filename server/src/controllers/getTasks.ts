import { Request, Response } from "express";

import { Task } from "../models/Task.js";

// Get all tasks by UserId
export async function getTasksByUserId(req: Request, res: Response) {
  const { userId } = req.params;

  if (!userId) {
    throw new Error("User ID is required.");
  }

  const tasks = await Task.find({ userId }).exec();

  return res.json(tasks);
}
