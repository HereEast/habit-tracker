import express from "express";

import { updateEntryStatus, verifyToken } from "../controllers/index.js";

const router = express.Router();

// Update
router.route("/").patch(verifyToken, updateEntryStatus);

export { router as entriesRouter };
