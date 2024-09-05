import express from "express";

import { DayStatus, ITask, Task } from "../models/Task.js";
import { getDaysInMonth, getMonthFromIndex } from "../utils/handlers.js";
import { StatusType } from "../utils/types.js";
import { User } from "../models/User.js";

const router = express.Router();

// Get all
// router.route("/").get(async (req, res) => {
//   try {
//     const userId = req.query.userId as string;

//     if (!userId) {
//       return res.status(400).json({ error: "User ID is required" });
//     }

//     const tasks = await Task.find({ userId });

//     if (!tasks) {
//       return res.status(404).json({ message: "No tasks found for this user" });
//     }

//     return res.json(tasks);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// });

// Get tasks by user ID
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw new Error("User ID is required.");
  }

  const tasks = await Task.find({ userId }).exec();

  // const filteredTasks = tasks.filter((task) => {
  //   const yearData = task.timeline.get("2024");

  //   if (!yearData) return false;

  //   const monthData = yearData.months["september"];

  //   return monthData !== undefined;
  // });

  const filteredTasks = tasks.forEach((task) => {
    const yearData = task.timeline.get("2024");

    if (!yearData) return false;

    // const ob1 = Object.fromEntries(yearData.months["september"]);

    console.log("For each:", yearData.months.get("september"));

    // const monthData = yearData.months["september"];

    // return monthData !== undefined;
  });

  console.log(tasks);
  console.log(filteredTasks);

  // return res.json(user.$getPopulatedDocs);
});

// Create
router.route("/create").post(async (req, res) => {
  const { title, userId } = req.body;

  if (!title) {
    throw new Error("Title is missing when creating a new task.");
  }

  if (!userId) {
    throw new Error("UserId is missing when creating a new task.");
  }

  try {
    const date = new Date();
    const year = date.getFullYear();
    const monthIndex = date.getMonth();

    const daysInMonth = getDaysInMonth(monthIndex + 1, year);
    const month = getMonthFromIndex(monthIndex);

    const dailyEntries = new Map();

    for (let i = 0; i < daysInMonth; i++) {
      const data: DayStatus = {
        status: 0 as StatusType,
        invalid: i < date.getDay(),
        disabled: i < date.getDay(),
      };

      const day = String(i + 1);
      dailyEntries.set(day, data);
    }

    const monthsData = new Map();
    monthsData.set(month, { days: dailyEntries });

    const timeline = new Map();
    timeline.set(String(year), { months: monthsData });

    const taskData: ITask = {
      title,
      userId,
      timeline,
    };

    console.log("✅ New task created:", taskData);

    const task = new Task(taskData);
    await task.save();

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    user.tasks.push(task._id);
    await user.save();

    return res.status(201).json(task);
  } catch (err) {
    console.log("Error", err);
  }
});

// Get User's month tasks
// router.get("/:userId/:year/:month", async (req, res) => {
//   const { userId, year, month } = req.params;

//   try {
//     const user = await User.findById(userId).populate("tasks").exec();

//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     // const yearData = user.timeline.get(year);

//     const yearData = user.tasks.map((task) => task.timeline.get(year));

//     console.log(yearData);

//     if (!yearData) {
//       return res.status(404).json({ message: `No data for the year ${year}` });
//     }

//     // const monthData = yearData..map((data) => data);

//     // console.log(monthData);

//     // if (!monthData) {
//     //   return res.status(404).json({
//     //     message: `No tasks found for the month ${month} of ${year}`,
//     //   });
//     // }

//     // res.json({ tasks: monthData.days });
//   } catch (error) {
//     console.error("Error fetching tasks:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

export { router as tasksRouter };
