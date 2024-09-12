import express from "express";

import { createUser } from "../controllers/createUser.js";
import { getUserById } from "../controllers/getUsers.js";

const router = express.Router();

// Get
router.route("/:userId").get(getUserById);

// Create
router.route("/").post(createUser);

export { router as usersRouter };
