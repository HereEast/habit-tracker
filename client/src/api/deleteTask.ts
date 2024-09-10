import axios from "axios";
import mongoose from "mongoose";

import { BASE_URL } from "~/utils";
import { ITask } from "~/~/models/Task";

export async function deleteTaskById(
  userId: string,
  taskId: mongoose.Types.ObjectId,
): Promise<ITask[] | undefined> {
  try {
    const response = await axios.delete(`${BASE_URL}/tasks/delete/${userId}/${taskId}`);

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
