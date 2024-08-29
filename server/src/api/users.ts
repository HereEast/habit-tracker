import express from "express";
import mongoose, { Schema } from "mongoose";

import { User } from "../models/User.js";
import { type UserType } from "../schemas/index.js";

const router = express.Router();

// Create
router.post("/create", async (req, res) => {
  const userData: UserType = {
    username: "hereeast",
    email: "test@test.com",
    password: "123",
    tasks: [],
  };

  return res.json(userData);

  // try {
  //   const newUser = new User(userData);
  //   await newUser.save();

  //   res.status(201).json(newUser);
  // } catch (err) {
  //   console.error("Error creating user:", err);
  //   res.status(500).json({ message: "Error creating user", error: err });
  // }
});

// Get all
router.get("/", async (req, res) => {
  const db = mongoose.connection.db;

  if (!db) {
    throw new Error("No DB found at route: /api/users.");
  }

  const collections = await db.listCollections().toArray();
  const collectionNames = collections.map((collection) => collection.name);

  return res.json(collectionNames);
});

export { router as usersRouter };
