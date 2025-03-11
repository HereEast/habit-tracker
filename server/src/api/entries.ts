import express from "express";

import { updateEntryStatus } from "../controllers/updateEntry.js";
import { verifyToken } from "../controllers/verifyToken.js";

const router = express.Router();

// Update
router.route("/").patch(verifyToken, updateEntryStatus);

export { router as entriesRouter };
