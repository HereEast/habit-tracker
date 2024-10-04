import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { User } from "../models/User.js";

// Login
export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    // Check user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(409).json({
        success: false,
        message: "User with this email doesn't exist.",
      });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(409).json({
        success: false,
        message: "Password is not correct.",
      });
    }

    return res.status(201).json({
      success: true,
      user,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log("🔴 Error:", err.message);

      return res.status(500).json({
        message: "Failed to login.",
      });
    }
  }
}
