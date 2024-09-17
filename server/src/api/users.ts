import express from "express";

import { createUser } from "../controllers/createUser.js";
import { getUser } from "../controllers/getUsers.js";
import { updateUser } from "../controllers/updateUser.js";

const router = express.Router();

// Get
router.route("/:userId").get(getUser);

// Create
router.route("/").post(createUser);

// Update
router.route("/:userId").patch(updateUser);

export { router as usersRouter };
