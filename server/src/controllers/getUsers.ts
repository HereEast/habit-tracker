import { Request, Response } from "express";
import { User } from "../models/User.js";

export async function getUserById(req: Request, res: Response) {
  const { userId } = req.params;

  if (!userId) {
    throw new Error("User ID is required.");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new Error(`User with ID ${userId} doesn't exist in the DB.`);
  }

  return res.json(user);
}
