import express from "express";

import { getTimeline } from "../controllers/getTimeline.js";
import { getCurrentMonthData } from "../controllers/getCurrentMonthData.js";
import { verifyToken } from "../controllers/verifyToken.js";

const router = express.Router();

// Get
router.route("/").get(verifyToken, getTimeline);
router.route("/month").get(verifyToken, getCurrentMonthData);

export { router as timelineRouter };
