import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { IUser, User } from "../models/User.js";
import { mapUser } from "../utils/mappers.js";

type NewUserData = Omit<IUser, "_id" | "createdAt">;

const SALT_ROUNDS = 10;

// Create User
export async function createUser(req: Request, res: Response) {
  const { username, email, password } = req.body;

  const hash = await bcrypt.hash(password, SALT_ROUNDS);

  const takenEmail = await User.findOne({ email });
  const takenUsername = await User.findOne({ username });

  if (takenEmail) {
    return res.status(409).json({
      message: "User with this email already exists.",
    });
  }

  if (takenUsername) {
    return res.status(409).json({
      message: "User with this username already exists.",
    });
  }

  const userData: NewUserData = {
    username,
    email,
    password: hash,
  };

  try {
    const newUser = new User(userData);
    await newUser.save();

    const mappedUser = mapUser(newUser.toObject());

    return res.status(201).json(mappedUser);
  } catch (err) {
    if (err instanceof Error) {
      console.log("🔴 Error:", err.message);

      return res.status(500).json({
        message: "Failed to create a User.",
      });
    }
  }
}
