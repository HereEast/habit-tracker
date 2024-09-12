import axios from "axios";
import mongoose from "mongoose";

import { BASE_URL } from "~/utils";
// import { ITask } from "~/~/models/Task";

// Get user's tasks
export async function getTasksByUserId(userId: string) {
  try {
    const response = await axios.get(`${BASE_URL}/tasks/${userId}`);
    const data = response.data;

    return data;
  } catch (err) {
    console.log(err); // Handle
  }
}

// Create
export async function createTask(userId: string, title: string) {
  try {
    const response = await axios.post(
      `${BASE_URL}/tasks`,
      {
        userId,
        title,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = response.data;

    return data;
  } catch (err) {
    console.log(err); // Handle
  }
}

// Delete
export async function deleteTaskById(
  userId: string,
  taskId: mongoose.Types.ObjectId,
) {
  try {
    const response = await axios.delete(
      `${BASE_URL}/tasks/${userId}/${taskId}`,
    );

    const data = response.data;

    return data;
  } catch (err) {
    console.log(err); // Handle
  }
}
