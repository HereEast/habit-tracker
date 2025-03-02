import express from "express";

import { getUserYear } from "../controllers/getUserYear.js";
// import { login, verifyToken } from "../controllers/login.js";

const router = express.Router();

// Get
router.route("/timeline/:year").get(getUserYear);
// router.route("/timeline/:year").get(verifyToken, getUserYear);

export { router as timelineRouter };
