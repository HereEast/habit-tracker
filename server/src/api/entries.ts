import express from "express";

import { getUserEntriesByDay, getMonthEntriesByTaskId } from "../controllers/getEntries.js";
import { updateEntryStatus } from "../controllers/updateEntry.js";

const router = express.Router();

// Get
router.route("/day/:userId").get(getUserEntriesByDay);
router.route("/:userId/:taskId").get(getMonthEntriesByTaskId);

// Update
router.route("/:entryId").patch(updateEntryStatus);

export { router as entriesRouter };
