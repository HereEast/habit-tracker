import express from "express";

import { getUserEntriesByDay, getMonthEntriesByTaskId } from "../controllers/getEntries.js";

const router = express.Router();

// Get
router.route("/day/:userId").get(getUserEntriesByDay);
router.route("/:userId/:taskId").get(getMonthEntriesByTaskId);

export { router as entriesRouter };
