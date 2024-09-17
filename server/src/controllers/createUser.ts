import { Request, Response } from "express";

import { IUser, User } from "../models/User.js";

type NewUserData = Omit<IUser, "_id">;

// Create User
export async function createUser(req: Request, res: Response) {
  const { username, email, password } = req.body;

  const userData: NewUserData = {
    username,
    email,
    password,
    tasks: [],
  };

  try {
    const newUser = new User(userData);
    await newUser.save();

    return res.status(201).json(newUser);
  } catch (err) {
    if (err instanceof Error) {
      console.log("🔴 Error:", err.message);

      return res.status(500).json({
        message: "Failed to create the user.",
      });
    }
  }
}
