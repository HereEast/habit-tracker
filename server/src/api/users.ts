import express from "express";

import { createUser } from "../controllers/createUser.js";
import { getUser } from "../controllers/getUsers.js";
import { updateUser } from "../controllers/updateUser.js";
import { verifyToken } from "../controllers/login.js";

const router = express.Router();

// Get
router.route("/:slug").get(getUser);

// Create
router.route("/").post(verifyToken, createUser);

// Update
router.route("/").patch(verifyToken, updateUser);

export { router as usersRouter };
