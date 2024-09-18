import mongoose from "mongoose";
import axios, { AxiosResponse } from "axios";

import { BASE_URL, handleRequestError } from "~/utils";
import { IEntry, Status } from "~/~/models/Entry";

type UpdateResponse = {
  message: string;
};

interface GetEntriesParams {
  userId?: string; // change to mongoose
  taskId?: mongoose.Types.ObjectId;
  year: number;
  month: number;
  day?: number;
}

// Get Entries
export async function getEntries(params: GetEntriesParams) {
  const { userId, taskId, year, month, day } = params;

  try {
    const response: AxiosResponse<IEntry[]> = await axios.get(
      `${BASE_URL}/entries`,
      {
        params: {
          userId,
          taskId,
          year,
          month,
          day,
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

// Update entry status
export async function updateEntryStatus(
  entryId: mongoose.Types.ObjectId,
  status: Status,
) {
  try {
    const response: AxiosResponse<UpdateResponse> = await axios.patch(
      `${BASE_URL}/entries/${entryId}`,
      {
        status: String(status),
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
