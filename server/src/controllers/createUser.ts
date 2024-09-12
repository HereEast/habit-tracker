import { Request, Response } from "express";

import { IUser, User } from "../models/User.js";

export async function createUser(req: Request, res: Response) {
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
}
