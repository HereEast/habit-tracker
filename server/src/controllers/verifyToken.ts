import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { SECRET_KEY } from "../config.js";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeaders = req.headers["authorization"];
  const token = authHeaders && authHeaders?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Auth token is missing.",
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
