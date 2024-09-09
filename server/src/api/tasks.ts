import express from "express";

import { createTask } from "../controllers/createTask.js";

import { getAllTasks, getTasksByUserId, getMonthTasks } from "../controllers/getTasks.js";

const router = express.Router();

router.route("/").get(getAllTasks);
router.route("/:userId").get(getTasksByUserId);
router.route("/:userId/:year").get(getMonthTasks);

router.route("/create").post(createTask);

export { router as tasksRouter };
