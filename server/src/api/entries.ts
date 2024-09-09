import express from "express";

import { getTaskEntriesByMonth } from "../controllers/getEntries.js";

const router = express.Router();

router.route("/:userId/:taskId/:year/:month").get(getTaskEntriesByMonth);

export { router as entriesRouter };
