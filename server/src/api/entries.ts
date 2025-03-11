import express from "express";

import { updateEntryStatus } from "../controllers/updateEntry.js";
// import { verifyToken } from "../controllers/login.js";

const router = express.Router();

// Update
router.route("/").patch(updateEntryStatus);

export { router as entriesRouter };
