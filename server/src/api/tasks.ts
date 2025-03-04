import express from "express";

import { createTask } from "../controllers/createTask.js";
import { getUserTasks } from "../controllers/getUserTasks.js";
import { deleteTask } from "../controllers/deleteTask.js";
import { updateTask } from "../controllers/updateTask.js";
import { verifyToken } from "../controllers/login.js";

const router = express.Router();

// Get
// router.route("/user").get(verifyToken, getUserTasks);
router.route("/user/:userId").get(getUserTasks);

// Create
// router.route("/").post(verifyToken, createTask);
router.route("/").post(createTask);

// Update
router.route("/:taskId").patch(verifyToken, updateTask);

// Delete
router.route("/:taskId").delete(verifyToken, deleteTask);

export { router as tasksRouter };
