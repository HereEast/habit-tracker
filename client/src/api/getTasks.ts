import axios from "axios";

import { TaskType } from "~/schemas";
import { BASE_URL } from "~/utils";

export async function getTasks(
  userId: string,
): Promise<TaskType[] | undefined> {
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
    console.log(err);
  }
}
