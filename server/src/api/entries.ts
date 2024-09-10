import express from "express";

import { getAllDailyEntries, getMonthEntriesByTaskId } from "../controllers/getEntries.js";

const router = express.Router();

router.route("/month/task/:userId/:taskId/:year/:month").get(getMonthEntriesByTaskId);
router.route("/day/:userId/:year/:month/:day").get(getAllDailyEntries);

export { router as entriesRouter };
