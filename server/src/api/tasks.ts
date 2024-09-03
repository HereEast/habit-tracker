import express from "express";

import { Task } from "../models/Task.js";
import { getDaysInMonth, getMonthFromIndex } from "../utils/handlers.js";

const router = express.Router();

// Get all
router.route("/").get(async (req, res) => {
  try {
    const userId = req.query.userId as string;
    // const userId = "66d0db0c810e60d1f8a7c9d8";

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const tasks = await Task.find({ userId });

    if (!tasks) {
      return res.status(404).json({ message: "No tasks found for this user" });
    }

    return res.json(tasks);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Create
router.route("/create").post(async (req, res) => {
  if (!req.body.title) {
    throw new Error("Title is missing when creating a new task.");
  }

  if (!req.body.userId) {
    throw new Error("UserId is missing when creating a new task.");
  }

  try {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();

    const daysInMonth = getDaysInMonth(month + 1, year);
    const dailyData = [];

    for (let i = 0; i < daysInMonth; i++) {
      const data = {
        status: "0",
        day: i + 1,
        month: getMonthFromIndex(month),
        year: date.getFullYear(),
        invalid: i < date.getDay(),
        disabled: i < date.getDay(),
      };

      dailyData.push(data);
    }

    const task = new Task({
      title: req.body.title,
      userId: req.body.userId,
      data: dailyData,
    });

    await task.save();

    return res.status(201).json(task);
  } catch (err) {
    console.log("Error", err);
  }
});

export { router as tasksRouter };
