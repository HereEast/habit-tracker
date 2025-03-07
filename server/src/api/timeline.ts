import express from "express";

import { getTimeline } from "../controllers/getTimeline.js";
import { getCurrentMonthData } from "../controllers/getCurrentMonthData.js";
// import { login, verifyToken } from "../controllers/login.js";

const router = express.Router();

// Get
router.route("/").get(getTimeline);
router.route("/month").get(getCurrentMonthData);
// router.route("/timeline/:year").get(verifyToken, getUserYear);

export { router as timelineRouter };
