import express from "express";

import { getEntries } from "../controllers/getEntries.js";
import { updateEntryStatus } from "../controllers/updateEntry.js";
import { verifyToken } from "../controllers/login.js";

const router = express.Router();

// Get
router.route("/").get(verifyToken, getEntries);

// Update
router.route("/:entryId").patch(verifyToken, updateEntryStatus);

export { router as entriesRouter };
