import express from "express";
import * as mongodb from "mongodb";

import * as connect from "../mongodb/connect.js";
const ObjectId = mongodb.ObjectId;

const router = express.Router();

router.route("/api").get(async (req, res) => {
  const db = connect.getDb();
  const data = await db.collection("todos").find({}).toArray();

  if (!data.length) {
    console.log("❌ No todos found.");
    return res.status(404).json({ message: "No todos found." });
  }

  res.json(data);
});

router.route("/api/:id").get(async (req, res) => {
  const db = connect.getDb();

  const id = String(req.params.id);
  const data = await db.collection("todos").findOne({ _id: new ObjectId(id) });

  if (!data.length) {
    throw new Error(`Todo with ID: ${id} was not found.`);
  }

  res.json(data);
});

export { router as todosRouter };
