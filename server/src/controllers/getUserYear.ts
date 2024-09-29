import { Request, Response } from "express";

import { User } from "../models/User.js";

// Get User year data
export async function getUserYear(req: Request, res: Response) {
  const { userId, year } = req.params;

  try {
    const user = await User.findById(userId).populate("timeline.months.tasks");
    const yearData = user?.timeline.find((item) => item.year === Number(year));

    return res.json(yearData);
  } catch (err) {
    if (err instanceof Error) {
      console.log("🔴 Error:", err.message);

      return res.status(500).json({
        message: "Failed to fetch user's year data.",
      });
    }
  }
}
