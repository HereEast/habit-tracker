import { Request, Response } from "express";

import { Entry } from "../models/Entry.js";

// Get Entries by TaskId
export async function getEntriesByTaskId(req: Request, res: Response) {
  const { taskId } = req.params;

  if (!taskId) {
    throw new Error("Task ID is required.");
  }

  const entries = await Entry.find({ taskId }).exec();

  return res.json(entries);
}
