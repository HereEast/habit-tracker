import axios, { AxiosError, AxiosResponse } from "axios";

import { ITask } from "~/server/models/Task";
import { BASE_URL } from "~/utils/constants";
import { CreateTaskInput } from "~/utils/types";

// Get user's tasks
export async function getUserTasks(userId: string) {
  try {
    const response: AxiosResponse<ITask[]> = await axios.get(
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
