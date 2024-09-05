import { Request, Response } from "express";

import { Task } from "../models/Task.js";

// Get all tasks by UserId
export async function getMonthTasks(req: Request, res: Response) {
  const { userId, year, month } = req.params;

  if (!userId) {
    throw new Error("User ID is required.");
  }

  const tasks = await Task.find({ userId }).exec();

  return res.json(tasks);
}

// Get all tasks by UserId
export async function getAllTasksByUserId(req: Request, res: Response) {
  const { userId } = req.params;

  if (!userId) {
    throw new Error("User ID is required.");
  }

  const tasks = await Task.find({ userId }).exec();

  return res.json(tasks);
}

// Get all tasks
export async function getAllTasks(req: Request, res: Response) {
  const tasks = await Task.find();

  return res.json(tasks);
}
