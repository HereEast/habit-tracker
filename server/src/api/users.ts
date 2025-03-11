import express from "express";

import { createUser } from "../controllers/createUser.js";
import { getUser } from "../controllers/getUsers.js";
// import { verifyToken } from "../controllers/login.js";

const router = express.Router();

// Get
router.route("/:slug").get(getUser);

// Create
router.route("/").post(createUser);

export { router as usersRouter };
