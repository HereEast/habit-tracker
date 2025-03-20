import axios, { AxiosResponse } from "axios";

import { BASE_URL } from "~/utils/constants";
import { getToday } from "~/utils/helpers";
import { handleApiError } from "~/utils/helpers/api";
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
    handleApiError(err);
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
    handleApiError(err);
  }
}

// Delete task
export async function deleteTask({ taskId, createdAt }: DeleteTaskInput) {
  const { currentMonth } = getToday();
  const createdAtMonth = new Date(createdAt).getMonth() + 1;

  const isCurrentMonth = currentMonth === createdAtMonth;

  const url = isCurrentMonth
    ? `${BASE_URL}/api/tasks/${taskId}` // Permanent delete
    : `${BASE_URL}/api/tasks/delete/${taskId}`; // Soft delete

  const method = isCurrentMonth ? "DELETE" : "PATCH";

  try {
    const response: AxiosResponse<BasicTask> = await axios({
      method,
      url,
      headers: { "Content-Type": "application/json" },
    });

    const data = response.data;

    return data;
  } catch (err) {
    handleApiError(err);
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
    handleApiError(err);
  }
}
