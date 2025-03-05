import axios, { AxiosError, AxiosResponse } from "axios";

import { IEntry } from "~/server/models/Entry";
import { BASE_URL } from "~/utils/constants";

export interface MonthTaskEntriesInput {
  userId: string;
  taskId: string;
  year: number;
  month: number;
}

// Get month task Entries
export async function getMonthEntriesByTask(input: MonthTaskEntriesInput) {
  const { userId, taskId, year, month } = input;

  try {
    const response: AxiosResponse<IEntry[]> = await axios.get(
      `${BASE_URL}/api/entries`,
      {
        params: {
          userId,
          taskId,
          year,
          month,
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
