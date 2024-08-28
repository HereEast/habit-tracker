import express from "express";
import * as mongodb from "mongodb";

import * as connect from "../mongodb/connect.ts";

// import { Task } from "~/mongodb/models/Task";

const ObjectId = mongodb.ObjectId;

const router = express.Router();

// Get all tasks
router.route("/api").get(async (req, res) => {
  const db = connect.getDb();
  const data = await db.collection("todos").find({}).toArray();

  if (!data.length) {
    console.log("❌ No todos found.");
    return res.status(404).json({ message: "No todos found." });
  }

  res.json(data);
});

// Get a task by ID
router.route("/api/:id").get(async (req, res) => {
  const db = connect.getDb();

  const id = String(req.params.id);
  const data = await db.collection("todos").findOne({ _id: new ObjectId(id) });

  if (!data.length) {
    throw new Error(`Task with ID: ${id} was not found.`);
  }

  res.json(data);
});

export { router as taskRouter };
