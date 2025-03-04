import axios, { AxiosError, AxiosResponse } from "axios";

import { ITask } from "~/server/models/Task";
import { BASE_URL } from "~/utils/constants";

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
