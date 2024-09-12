import { Request, Response } from "express";

import { User } from "../models/User.js";

export async function getUserById(req: Request, res: Response) {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).exec();

    return res.json(user);
  } catch (err) {
    if (err instanceof Error) {
      console.log("🔴 Error:", err.message);

      return res.status(500).json({
        message: "Failed to fetch the user by user ID.",
      });
    }
  }
}
