import axios, { AxiosError, AxiosResponse } from "axios";

// import { ITask } from "~/server/models/Task";
import { BASE_URL } from "~/utils/constants";
import { getToday } from "~/utils/helpers";
import { CreateTaskInput, DeleteTaskInput, ITask } from "~/utils/types";

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

// Delete task (update "deleted" and "deletedAt")
export async function deleteTask({ taskId, createdAt }: DeleteTaskInput) {
  const { currentMonth } = getToday();
  const createdAtMonth = new Date(createdAt).getMonth() + 1;

  try {
    // Delete forever (w Entries)
    if (currentMonth === createdAtMonth) {
      const response: AxiosResponse<ITask> = await axios.delete(
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
    const response: AxiosResponse<ITask> = await axios.patch(
      `${BASE_URL}/api/tasks/${taskId}`,
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

// export async function deleteTask({ userId, taskId }: DeleteTaskInput) {
//   try {
//     const response: AxiosResponse<ITask> = await axios.patch(
//       `${BASE_URL}/api/tasks`,
//       {
//         userId,
//         taskId,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//     );

//     const data = response.data;

//     return data;
//   } catch (err) {
//     if (err instanceof AxiosError) {
//       console.log("🔴 Error:", err.response?.data.message);

//       throw new Error(err.response?.data.message);
//     }
//   }
// }
