import { Request, Response } from "express";

import { Entry } from "../models/Entry.js";

// Update status
export async function updateEntryStatus(req: Request, res: Response) {
  const { entryId } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(500).json({
      message: "Some parameters are missing: status.",
    });
  }

  try {
    await Entry.updateOne({ _id: entryId }, { $set: { status } }).exec();

    return res.status(201).json({
      message: "Entry successfully updated.",
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log("🔴 Error:", err.message);

      return res.status(500).json({
        message: "Failed to update Entry status.",
      });
    }
  }
}
