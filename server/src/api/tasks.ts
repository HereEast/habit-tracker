import express from "express";

import {
  getTasks,
  createTask,
  deleteTask,
  deleteTaskFromCurrentMonth,
  updateTask,
  verifyToken,
} from "../controllers/index.js";

const router = express.Router();

// Get
router.route("/user/:userId").get(verifyToken, getTasks);

// Create
router.route("/").post(verifyToken, createTask);

// Update
router.route("/:taskId").patch(verifyToken, updateTask);
router.route("/delete/:taskId").patch(verifyToken, deleteTaskFromCurrentMonth);

// Delete
router.route("/:taskId").delete(verifyToken, deleteTask);

export { router as tasksRouter };
