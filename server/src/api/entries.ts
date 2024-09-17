import express from "express";

import { getEntries } from "../controllers/getEntries.js";
import { updateEntryStatus } from "../controllers/updateEntry.js";

const router = express.Router();

// Get
router.route("/:userId").get(getEntries);

// Update
router.route("/:entryId").patch(updateEntryStatus);

export { router as entriesRouter };
