import axios, { AxiosResponse } from "axios";
import mongoose from "mongoose";

import { BASE_URL, handleRequestError } from "~/utils";
import { ITask } from "~/~/models/Task";

type MessageResponse = {
  message: string;
};

// Get user's tasks
export async function getTasksByUserId(userId: string) {
  try {
    const response: AxiosResponse<ITask[]> = await axios.get(
      `${BASE_URL}/tasks/${userId}`,
    );
    const data = response.data;

    return data;
  } catch (err) {
    if (err instanceof Error) {
      handleRequestError(err);
    }
  }
}

// Create
export async function createTask(userId: string, title: string) {
  try {
    const response: AxiosResponse<ITask> = await axios.post(
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
    if (err instanceof Error) {
      handleRequestError(err);
    }
  }
}

// Update title
export async function updateTaskTitle(
  taskId: mongoose.Types.ObjectId,
  newTitle: string,
) {
  try {
    const response: AxiosResponse<MessageResponse> = await axios.patch(
      `${BASE_URL}/tasks/${taskId}`,
      {
        newTitle,
      },
    );

    const data = response.data;

    return data;
  } catch (err) {
    if (err instanceof Error) {
      handleRequestError(err);
    }
  }
}

// Delete
export async function deleteTaskById(
  userId: string,
  taskId: mongoose.Types.ObjectId,
) {
  try {
    const response: AxiosResponse<MessageResponse> = await axios.delete(
      `${BASE_URL}/tasks/${userId}/${taskId}`,
    );

    const data = response.data;

    return data;
  } catch (err) {
    if (err instanceof Error) {
      handleRequestError(err);
    }
  }
}
