import express from "express";
import mongoose from "mongoose";

import { Task } from "../models/Task.js";

const router = express.Router();

// Get all
router.route("/").get(async (req, res) => {
  const db = mongoose.connection.db;

  if (!db) {
    throw new Error("No DB found at route: /api/tasks.");
  }

  const collections = await db.listCollections().toArray();
  const collectionNames = collections.map((collection) => collection.name);

  console.log(collections);

  return res.json(collectionNames);
});

// Create
router.route("/create").post(async (req, res) => {
  const task = new Task({ title: "New task 1" });
  await task.save();

  // res.json(task);
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
