import mongoose from "mongoose";
import axios from "axios";

import { BASE_URL, handleRequestError } from "~/utils";
import { IEntry } from "~/~/models/Entry";

// Get month entries by task ID
export async function getMonthEntriesByTaskId(
  userId: string,
  taskId: mongoose.Types.ObjectId | undefined,
  year: number,
  month: number,
): Promise<IEntry[] | undefined> {
  try {
    const response = await axios.get(
      `${BASE_URL}/entries/${userId}/${taskId}`,
      {
        params: {
          year,
          month,
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

// All users entries by day
export async function getUserEntriesByDay(
  userId: string,
  year: number,
  month: number,
  day: number,
): Promise<IEntry[] | undefined> {
  try {
    const response = await axios.get(`${BASE_URL}/entries/day/${userId}`, {
      params: {
        year,
        month,
        day,
      },
    });

    const data = response.data;

    return data;
  } catch (err) {
    if (err instanceof Error) {
      handleRequestError(err);
    }
  }
}
