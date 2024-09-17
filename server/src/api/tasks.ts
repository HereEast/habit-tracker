import express from "express";

import { createTask } from "../controllers/createTask.js";
import { getTasks } from "../controllers/getTasks.js";
import { deleteTask } from "../controllers/deleteTask.js";
import { updateTask } from "../controllers/updateTask.js";

const router = express.Router();

// Get
router.route("/:userId").get(getTasks);

// Create
router.route("/").post(createTask);

// Update
router.route("/:taskId").patch(updateTask);

// Delete
router.route("/:userId/:taskId").delete(deleteTask);

export { router as tasksRouter };
