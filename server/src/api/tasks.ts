import express from "express";

import { createTask } from "../controllers/createTask.js";
import { getTasksByUserId } from "../controllers/getTasks.js";
import { deleteTaskById } from "../controllers/deleteTask.js";
import { updateTask } from "../controllers/updateTask.js";

const router = express.Router();

// Get
router.route("/:userId").get(getTasksByUserId);

// Create
router.route("/").post(createTask);

// Update
router.route("/:taskId").patch(updateTask);

// Delete
router.route("/:userId/:taskId").delete(deleteTaskById);

export { router as tasksRouter };
