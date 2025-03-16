import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models/User.js";
import { SECRET_KEY } from "../config.js";

// Login
export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).lean();

    if (!user) {
      return res.status(404).json({
        message: "User with this email doesn't exist.",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(409).json({
        message: "Email and password don't match.",
      });
    }

    const payload = {
      _id: user._id,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "7d" });

    return res.status(201).json({ token });
  } catch (err) {
    if (err instanceof Error) {
      console.log("🔴 Error:", err.message);

      return res.status(500).json({
        message: "Failed to login.",
      });
    }
  }
}
