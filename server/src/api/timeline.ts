import express from "express";

import {
  getTimeline,
  getCurrentMonthData,
  verifyToken,
} from "../controllers/index.js";

const router = express.Router();

// Get
router.route("/").get(verifyToken, getTimeline);
router.route("/month").get(verifyToken, getCurrentMonthData);

export { router as timelineRouter };
