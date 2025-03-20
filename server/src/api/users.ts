import express from "express";

import { createUser, getUser, verifyToken } from "../controllers/index.js";

const router = express.Router();

// Get
router.route("/:slug").get(verifyToken, getUser);

// Create
router.route("/").post(createUser);

export { router as usersRouter };
