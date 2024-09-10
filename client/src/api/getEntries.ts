import mongoose from "mongoose";
import axios from "axios";

import { BASE_URL } from "~/utils";
import { IEntry } from "~/~/models/Entry";

export async function getMonthEntriesByTaskId(
  userId: string,
  taskId: mongoose.Types.ObjectId | undefined,
  year: number,
  month: number,
): Promise<IEntry[] | undefined> {
  try {
    const response = await axios.get(
      `${BASE_URL}/entries/month/task/${userId}/${taskId}/${year}/${month}`,
    );

    if (response.status !== 200) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const data = response.data;

    return data;
  } catch (err) {
    console.log(err); // Handle
  }
}

// All daily entries
export async function getAllDailyEntries(
  userId: string,
  year: number,
  month: number,
  day: number,
): Promise<IEntry[] | undefined> {
  try {
    const response = await axios.get(
      `${BASE_URL}/entries/day/${userId}/${year}/${month}/${day}`,
    );

    if (response.status !== 200) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const data = response.data;

    return data;
  } catch (err) {
    console.log(err); // Handle
  }
}
