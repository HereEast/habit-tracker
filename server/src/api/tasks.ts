import express from "express";

import { createTask } from "../controllers/createTask.js";
import { getTasks } from "../controllers/getTasks.js";
import { deleteTask } from "../controllers/deleteTask.js";
import { updateTask } from "../controllers/updateTask.js";
import { verifyToken } from "../controllers/verifyToken.js";

const router = express.Router();

// Get
router.route("/user/:userId").get(verifyToken, getTasks);

// Create
router.route("/").post(verifyToken, createTask);

// Update
router.route("/:taskId").patch(verifyToken, updateTask);

// Delete
router.route("/:taskId").delete(verifyToken, deleteTask);

export { router as tasksRouter };
