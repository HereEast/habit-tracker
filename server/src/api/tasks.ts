import express from "express";

import { createTask } from "../controllers/createTask.js";

import { getTasksByUserId } from "../controllers/getTasks.js";
import { deleteTaskById } from "../controllers/deleteTask.js";

const router = express.Router();

router.route("/:userId").get(getTasksByUserId);

router.route("/create").post(createTask);
router.route("/delete/:userId/:taskId").delete(deleteTaskById);

export { router as tasksRouter };
