import express from "express";

import { getYearData } from "../controllers/getYearData.js";
// import { login, verifyToken } from "../controllers/login.js";

const router = express.Router();

// Get
router.route("/").get(getYearData);
// router.route("/timeline/:year").get(verifyToken, getUserYear);

export { router as timelineRouter };
