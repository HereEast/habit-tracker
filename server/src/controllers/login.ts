import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models/User.js";
import { SECRET_KEY } from "../config.js";

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

    // Get only necessary fields
    const userPayload = {
      _id: user._id,
      // email: user.email,
      username: user.username,
    };

    const token = jwt.sign(userPayload, SECRET_KEY || "", { expiresIn: "7d" });

    return res.status(201).json(token);
  } catch (err) {
    if (err instanceof Error) {
      console.log("🔴 Error:", err.message);

      return res.status(500).json({
        message: "Failed to login.",
      });
    }
  }
}

// Verify token
export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeaders = req.headers["authorization"];
  const token = authHeaders && authHeaders?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Authentication token is missing.",
    });
  }

  jwt.verify(token, SECRET_KEY || "", (err, user) => {
    if (err) {
      return res.status(403).json({
        message: "Invalid token.",
      });
    }

    req.body.user = user;

    next();
  });
}
