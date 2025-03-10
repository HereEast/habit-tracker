import { Error } from "mongoose";
import { Request, Response } from "express";

import { Task } from "../models/Task.js";
import { Entry } from "../models/Entry.js";

// // Delete from the current month (update "deleted" and "deletedAt")
// export async function deleteTaskFromCurrentMonth(req: Request, res: Response) {
//   const { taskId } = req.params;

//   if (!taskId) {
//     return res.status(500).json({
//       message: "Some parameters are missing: taskId.",
//     });
//   }

//   try {
//     const deletedTask = await Task.findOneAndUpdate(
//       { _id: taskId },
//       { $set: { deleted: true, deletedAt: new Date() } },
//     ).exec();

//     if (!deletedTask) {
//       return res.status(404).json({ message: "Task not found." });
//     }

//     return res.status(201).json(deletedTask);
//   } catch (err) {
//     if (err instanceof Error) {
//       console.log("🔴 Error:", err.message);

//       return res.status(500).json({
//         message: "Failed to update Task title.",
//       });
//     }
//   }
// }

// Delete task by ID (forever)
export async function deleteTask(req: Request, res: Response) {
  const { taskId } = req.params;

  if (!taskId) {
    return res.status(500).json({
      message: "Some parameters are missing: taskId.",
    });
  }

  try {
    const deletedTask = await Task.findOneAndDelete({ _id: taskId }).exec();
    await Entry.deleteMany({ taskId });

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found." });
    }

    return res.status(201).json(deletedTask);
  } catch (err) {
    if (err instanceof Error) {
      console.log("🔴 Error:", err.message);

      return res.status(500).json({
        message: "Failed to delete the task.",
      });
    }
  }
}
