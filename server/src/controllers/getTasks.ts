import { Request, Response } from "express";

import { Task } from "../models/Task.js";
import { IEntry } from "../models/Entry.js";
import mongoose from "mongoose";

// Get all tasks by UserId
export async function getMonthTasks(req: Request, res: Response) {
  const { userId, year, month } = req.params;

  if (!userId) {
    throw new Error("User ID is required.");
  }

  const tasks = await Task.find({ userId }).exec();

  // const tasksWithFilteredEntries = tasks.map((task) => {
  //   const filteredEntries = task.entries.filter((entry) => {
  //     const entryYear = entry.date.getFullYear();

  //     return entryYear === Number(year);
  //   });

  //   return {
  //     ...task.toObject(),
  //     entries: filteredEntries,
  //   };
  // });

  return res.json(tasks);
}

// Get all tasks by UserId
export async function getAllTasksByUserId(req: Request, res: Response) {
  const { userId } = req.params;

  if (!userId) {
    throw new Error("User ID is required.");
  }

  const tasks = await Task.find({ userId }).populate("entries").exec();

  return res.json(tasks);
}

// Get all tasks
export async function getAllTasks(req: Request, res: Response) {
  const tasks = await Task.find();

  return res.json(tasks);
}
