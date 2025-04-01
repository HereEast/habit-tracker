import { Request, Response } from "express";

import { ITask, Task } from "../models/Task.js";
import { Entry } from "../models/Entry.js";

import { filterTasksByMonth, filterTasksByYear } from "../utils/handlers.js";

import { getDaysInMonth, getToday } from "../utils/dates.js";
import { mapEntry, mapTask } from "../utils/mappers.js";
import { MonthTimelineData } from "../utils/types.js";
import { NewEntryData } from "./createTask.js";

// Get Timeline
export async function getCurrentMonthData(req: Request, res: Response) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(500).json({
      message: "Some parameters are missing: userId.",
    });
  }

  const { currentMonth, currentYear } = getToday();
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);

  try {
    const tasks: ITask[] = await Task.find({ userId })
      .populate("entries")
      .lean() // Converts to plain object
      .exec();

    const yearTasks = filterTasksByYear(tasks, currentYear);
    const monthTasks = filterTasksByMonth(yearTasks, currentMonth);

    const data = await Promise.all(
      monthTasks.map(async (task) => {
        let taskEntries = await Entry.find({
          userId,
          taskId: task._id,
          month: currentMonth,
          year: currentYear,
        })
          .lean()
          .exec();

        if (!taskEntries.length) {
          const newMonthEntries = [];

          for (let i = 1; i <= daysInMonth; i++) {
            const entryData: NewEntryData = {
              userId: userId as string,
              taskId: task._id,
              year: currentYear,
              month: currentMonth,
              day: i,
              status: 0,
            };

            const entry = new Entry(entryData);
            await entry.save();

            newMonthEntries.push(entry);
          }

          taskEntries = newMonthEntries;
        }

        return {
          task: mapTask(task),
          entries: taskEntries.map(mapEntry),
        };
      }),
    );

    const currentMonthData: MonthTimelineData = {
      month: currentMonth,
      tasks: data,
    };

    return res.json(currentMonthData);
  } catch (err) {
    if (err instanceof Error) {
      console.log("🔴 Error:", err.message);

      return res.status(500).json({
        message: "Failed to fetch user's year data.",
      });
    }
  }
}

// export async function getCurrentMonthData(req: Request, res: Response) {
//   const { userId } = req.query;

//   if (!userId) {
//     return res.status(500).json({
//       message: "Some parameters are missing: userId.",
//     });
//   }

//   const { currentMonth, currentYear } = getToday();

//   try {
//     const tasks: ITask[] = await Task.find({ userId })
//       .populate("entries")
//       .lean() // Converts to plain object
//       .exec();

//     const yearTasks = filterTasksByYear(tasks, currentYear);
//     const monthTasks = filterTasksByMonth(yearTasks, currentMonth);

//     const entries: IEntry[] = [];

//     monthTasks.forEach(async (task) => {
//       const taskEntries = await Entry.find({ userId, taskId: task._id })
//         .lean()
//         .exec();

//       entries.push(taskEntries);
//     });

//     const data = monthTasks.map((task) => {
//       const entries = task.entries as IEntry[];

//       const monthEntries = getEntriesByMonth(
//         entries,
//         currentMonth,
//         currentYear,
//       );

//       const mappedTask = mapTask(task);
//       const mappedEntries = monthEntries.map(mapEntry);

//       return {
//         task: mappedTask,
//         entries: mappedEntries,
//       };
//     });

//     const currentMonthData: MonthTimelineData = {
//       month: currentMonth,
//       tasks: data,
//     };

//     return res.json(currentMonthData);
//   } catch (err) {
//     if (err instanceof Error) {
//       console.log("🔴 Error:", err.message);

//       return res.status(500).json({
//         message: "Failed to fetch user's year data.",
//       });
//     }
//   }
// }
