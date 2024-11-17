import axios, { AxiosResponse } from "axios";

import { BASE_URL } from "~/utils/constants";
import { handleRequestError } from "~/utils/handlers";
import { ITask } from "~/utils/types";

type MessageResponse = {
  message: string;
};

// Get user's tasks
export async function getUserTasks() {
  try {
    const response: AxiosResponse<ITask[]> = await axios.get(
      `${BASE_URL}/tasks/user`,
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
export async function createTask(title: string) {
  try {
    const response: AxiosResponse<ITask> = await axios.post(
      `${BASE_URL}/tasks`,
      {
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
export async function updateTask(taskId: string, title: string) {
  try {
    const response: AxiosResponse<MessageResponse> = await axios.patch(
      `${BASE_URL}/tasks/${taskId}`,
      {
        title,
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
export async function deleteTask(taskId: string) {
  try {
    const response: AxiosResponse<MessageResponse> = await axios.delete(
      `${BASE_URL}/tasks/${taskId}`,
    );

    const data = response.data;

    return data;
  } catch (err) {
    if (err instanceof Error) {
      handleRequestError(err);
    }
  }
}
