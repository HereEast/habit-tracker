import axios from "axios";
import mongoose from "mongoose";

import { BASE_URL } from "~/utils";
// import { ITask } from "~/~/models/Task";

// Get user's tasks
export async function getTasksByUserId(userId: string) {
  try {
    const response = await axios.get(`${BASE_URL}/tasks/${userId}`);

    if (response.status !== 200) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const data = response.data;

    return data;
  } catch (err) {
    console.log(err); // Handle
  }
}

// Create
export async function createTask(userId: string, title: string) {
  try {
    const response = await fetch("http://localhost:5050/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        title,
      }),
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
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

    if (response.status !== 200) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const data = response.data;

    console.log(data);

    return data;
  } catch (err) {
    console.log(err); // Handle
  }
}
