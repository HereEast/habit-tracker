import express from "express";
import * as mongodb from "mongodb";

// import * as connect from "../mongodb/connect.js";

import { Task } from "../mongodb/models/Task.js";

const ObjectId = mongodb.ObjectId;

const router = express.Router();

// Get all
router.route("/api").get(async (req, res) => {
  // const db = connect.getDb();
  // const data = await db.collection("todos").find({}).toArray();
  const data = await Task.find({});

  if (!data.length) {
    console.log("❌ No tasks found.");
    return res.status(404).json({ message: "No tasks found." });
  }

  return res.json(data);
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

// Create
router.route("/api/create").post(async (req, res) => {
  const task = new Task({
    title: req.body.title,
  });

  await task.save();

  // if (!data.length) {
  //   console.log("❌ No tasks found.");
  //   return res.status(404).json({ message: "No tasks found." });
  // }

  // return res.json(data);
});

export { router as taskRouter };
