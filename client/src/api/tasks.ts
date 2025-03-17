import axios, { AxiosError, AxiosResponse } from "axios";

import { BASE_URL } from "~/utils/constants";
import { getToday } from "~/utils/helpers";
import {
  BasicTask,
  ITask,
  CreateTaskInput,
  DeleteTaskInput,
  UpdateTaskInput,
} from "~/utils/types";

// Get user's tasks
export async function getUserTasks(userId: string) {
  try {
    const response: AxiosResponse<BasicTask[]> = await axios.get(
      `${BASE_URL}/api/tasks/user/${userId}`,
    );

    const data = response.data;

    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log("🔴 Error:", err.response?.data.message);

      throw new Error(err.response?.data.message);
    }
  }
}

// Create task
export async function createTask({ userId, title }: CreateTaskInput) {
  try {
    const response: AxiosResponse<ITask> = await axios.post(
      `${BASE_URL}/api/tasks`,
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
    if (err instanceof AxiosError) {
      console.log("🔴 Error:", err.response?.data.message);

      throw new Error(err.response?.data.message);
    }
  }
}

// Delete task
export async function deleteTask({ taskId, createdAt }: DeleteTaskInput) {
  const { currentMonth } = getToday();
  const createdAtMonth = new Date(createdAt).getMonth() + 1;

  try {
    // Delete forever (w Entries)
    if (currentMonth === createdAtMonth) {
      const response: AxiosResponse<BasicTask> = await axios.delete(
        `${BASE_URL}/api/tasks/${taskId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = response.data;

      return data;
    }

    // Delete from the current month (update "deleted" field)
    const response: AxiosResponse<BasicTask> = await axios.patch(
      `${BASE_URL}/api/tasks/delete/${taskId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = response.data;

    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log("🔴 Error:", err.response?.data.message);

      throw new Error(err.response?.data.message);
    }
  }
}

// Update task (title)
export async function updateTaskTitle({ taskId, title }: UpdateTaskInput) {
  try {
    const response: AxiosResponse<BasicTask> = await axios.patch(
      `${BASE_URL}/api/tasks/${taskId}`,
      { title },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = response.data;

    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log("🔴 Error:", err.response?.data.message);

      throw new Error(err.response?.data.message);
    }
  }
}
