import express from "express";

import { createUser } from "../controllers/createUser.js";
import { getUser } from "../controllers/getUsers.js";
import { updateUser } from "../controllers/updateUser.js";
import { getUserYear } from "../controllers/getUserYear.js";
import { login } from "../controllers/login.js";

const router = express.Router();

// Get
router.route("/:userId/:year").get(getUserYear);
router.route("/:userId").get(getUser);

// Create
router.route("/").post(createUser);

// Login
router.route("/login").post(login);

// Update
router.route("/:userId").patch(updateUser);

export { router as usersRouter };
