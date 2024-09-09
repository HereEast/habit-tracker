import express from "express";

import { IUser, User } from "../models/User.js";

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  const users = await User.find({});

  if (!users) {
    throw new Error("Failed to get users from the DB.");
  }

  return res.json(users);
});

// Get user by ID
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw new Error("User ID is required.");
  }

  // const user = await User.findById(userId).populate("tasks").exec();
  const user = await User.findById(userId);

  if (!user) {
    throw new Error(`User with ID ${userId} doesn't exist in the DB.`);
  }

  return res.json(user);
});

// Create user
router.post("/create", async (req, res) => {
  const { username, email, password } = req.body;

  const userData: IUser = {
    username,
    email,
    password,
    tasks: [],
  };

  try {
    const newUser = new User(userData);
    await newUser.save();

    console.log("New user:", newUser);

    return res.status(201).json(newUser);
  } catch (err) {
    console.log("Error", err);
  }
});

export { router as usersRouter };
