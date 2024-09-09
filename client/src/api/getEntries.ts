import mongoose from "mongoose";
import axios from "axios";

import { BASE_URL } from "~/utils";
import { IEntry } from "~/~/models/Entry";

export async function getEntries(
  userId: string,
  taskId: mongoose.Types.ObjectId | undefined,
  year: number,
  month: number,
): Promise<IEntry[]> {
  try {
    const response = await axios.get(
      `${BASE_URL}/entries/${userId}/${taskId}/${year}/${month}`,
    );

    if (response.status !== 200) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const data = response.data;

    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
}
