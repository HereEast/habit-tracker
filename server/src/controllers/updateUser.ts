import { Request, Response } from "express";

import { User } from "../models/User.js";

// Update status
export async function updateUser(req: Request, res: Response) {
  const { userId } = req.body.user._id;
  const { year, month } = req.body;

  if (!year || !month) {
    return res.status(500).json({
      message: "Some parameters are missing: year, month.",
    });
  }

  // const timeline = {
  //   year: year,
  //   months
  // }

  const user = await User.findById({ userId });

  console.log(user);

  // try {
  //   await User.updateOne({ _id: userId }, { $set: { title } }).exec();

  //   return res.status(201).json({
  //     message: "User successfully updated.",
  //   });
  // } catch (err) {
  //   if (err instanceof Error) {
  //     console.log("🔴 Error:", err.message);

  //     return res.status(500).json({
  //       message: "Failed to update the User.",
  //     });
  //   }
  // }
}
