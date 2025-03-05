import { Request, Response } from "express";

import { Entry } from "../models/Entry.js";

// Get month Entries by task
export async function getMonthEntriesByTask(req: Request, res: Response) {
  const { userId, taskId, year, month } = req.query;

  if (!year || !month || !userId || !taskId) {
    return res.status(500).json({
      message: "Some parameters are missing: userId, taskId, year, month.",
    });
  }

  try {
    const entries = await Entry.find({ userId, taskId, year, month }).exec();

    return res.json(entries);
  } catch (err) {
    if (err instanceof Error) {
      console.log("🔴 Error:", err.message);

      return res.status(500).json({
        message: "Failed to fetch entries.",
      });
    }
  }
}

// Get task entries
// export async function getEntries(req: Request, res: Response) {
//   const { taskId, year, month, day } = req.query;
//   const userId = req.body.user._id;

//   if (!year || !month) {
//     return res.status(500).json({
//       message: "Some parameters are missing: year, month.",
//     });
//   }

//   const query: RootFilterQuery<IEntryQuery> = {
//     year: Number(year),
//     month: month,
//   };

//   if (userId) {
//     query.userId = userId;
//   }

//   if (taskId) {
//     query.taskId = taskId;
//   }

//   if (day) {
//     query.day = Number(day);
//   }

//   try {
//     const entries = await Entry.find(query).populate("taskId").exec();

//     const activeEntries = entries.filter((entry) => {
//       const activeTask = entry.taskId as ITask;
//       return activeTask.stopped === false;
//     });

//     return res.json(activeEntries);
//   } catch (err) {
//     if (err instanceof Error) {
//       console.log("🔴 Error:", err.message);

//       return res.status(500).json({
//         message: "Failed to fetch entries.",
//       });
//     }
//   }
// }
