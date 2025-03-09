import { Request, Response } from "express";

import { Entry } from "../models/Entry.js";

// Update status
export async function updateEntryStatus(req: Request, res: Response) {
  const { entryId, status } = req.body;

  if (status === undefined || !entryId) {
    return res.status(500).json({
      message: "Some parameters are missing: status, entryId",
    });
  }

  try {
    const updatedEntry = await Entry.findOneAndUpdate(
      { _id: entryId },
      { $set: { status } },
      { new: true },
    ).exec();

    if (!updatedEntry) {
      return res.status(404).json({ message: "Entry not found." });
    }

    return res.status(200).json(updatedEntry);
  } catch (err) {
    if (err instanceof Error) {
      console.log("🔴 Error:", err.message);

      return res.status(500).json({
        message: "Failed to update Entry status.",
      });
    }
  }
}
