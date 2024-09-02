import express from "express";

import { Task } from "../models/Task.js";

const router = express.Router();

// Get all
router.route("/").get(async (req, res) => {
  const tasks = await Task.find({ userId: req.body.userId });

  if (!tasks) {
    throw new Error("Failed to get tasks from the DB.");
  }

  return res.json(tasks);
});

// Create
router.route("/create").post(async (req, res) => {
  const task = new Task({ title: req.body.title });
  await task.save();

  return res.json(task);
});

router.post("/create", async (req, res) => {
  const taskData = {
    userId: req.body.userId,
    title: req.body.title,
    data: [{ status: "0", date: new Date() }],
    createdAt: new Date(),
    updatedAt: null,
  };

  try {
    const newTask = new Task(taskData);
    await newTask.save();

    console.log("New Task", newTask);

    return res.status(201).json(newTask);
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
