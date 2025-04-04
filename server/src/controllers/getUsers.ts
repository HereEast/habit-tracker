import { Request, Response } from "express";

import { User } from "../models/User.js";
import { mapUser } from "../utils/mappers.js";

// Get user by slug
export async function getUser(req: Request, res: Response) {
  const { slug } = req.params;

  try {
    const user = await User.findOne({ username: slug }).lean().exec();

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const mappedUser = mapUser(user);

    return res.json(mappedUser);
  } catch (err) {
    if (err instanceof Error) {
      console.log("🔴 Error:", err.message);

      return res.status(500).json({
        message: "Failed to fetch a user by slug.",
      });
    }
  }
}
