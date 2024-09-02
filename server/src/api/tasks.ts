import express from "express";

import { Task } from "../models/Task.js";

const router = express.Router();

// Get all
router.route("/:userId").get(async (req, res) => {
  const tasks = await Task.find({ userId: req.params.userId });

  if (!tasks) {
    throw new Error("Failed to get tasks from the DB.");
  }

  return res.json(tasks);
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
    const task = new Task({ title: req.body.title, userId: req.body.userId });
    await task.save();

    return res.status(201).json(task);
  } catch (err) {
    console.log("Error", err);
  }
});

// Get by ID
// router.route("/api/:id").get(async (req, res) => {
//   const db = connect.getDb();

//   const id = String(req.params.id);
//   const data = await db.collection("todos").findOne({ _id: new ObjectId(id) });

//   if (!data.length) {
//     throw new Error(`Task with ID: ${id} was not found.`);
//   }

//   return res.json(data);
// });

export { router as tasksRouter };
