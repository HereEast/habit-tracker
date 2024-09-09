import axios from "axios";

import { BASE_URL } from "~/utils";
import { ITask } from "~/~/models/Task";

export async function getTasks(userId: string): Promise<ITask[] | undefined> {
  try {
    const response = await axios.get(`${BASE_URL}/tasks`, {
      params: {
        userId,
      },
    });

    if (response.status !== 200) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const data = response.data;

    return data;
  } catch (err) {
    console.log(err); // Handle
  }
}
