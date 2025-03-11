import { Request, Response } from "express";

import { Entry } from "../models/Entry.js";
import { mapEntry } from "../utils/mappers.js";

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
    )
      .lean()
      .exec();

    if (!updatedEntry) {
      return res.status(404).json({ message: "Entry not found." });
    }

    const mappedEntry = mapEntry(updatedEntry);

    return res.status(200).json(mappedEntry);
  } catch (err) {
    if (err instanceof Error) {
      console.log("🔴 Error:", err.message);

      return res.status(500).json({
        message: "Failed to update Entry status.",
      });
    }
  }
}
