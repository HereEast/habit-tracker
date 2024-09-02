import express from "express";

import { User } from "../models/User.js";
import { type UserType } from "../schemas/index.js";

const router = express.Router();

// Get all
router.get("/", async (req, res) => {
  const users = await User.find({});

  if (!users) {
    throw new Error("Failed to get users from the DB.");
  }

  return res.json(users);
});

// Create
router.post("/create", async (req, res) => {
  const userData: UserType = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    tasks: [],
    createdAt: new Date(),
  };

  try {
    const newUser = new User(userData);
    await newUser.save();

    console.log("New User", newUser);

    return res.status(201).json(newUser);
  } catch (err) {
    console.log("Error", err);
  }
});

export { router as usersRouter };
