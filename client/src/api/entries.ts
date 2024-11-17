import axios, { AxiosResponse } from "axios";

import { BASE_URL } from "~/utils/constants";
import { handleRequestError } from "~/utils/handlers";
import { IEntry, Status } from "~/utils/types";

type UpdateResponse = {
  message: string;
};

interface GetEntriesParams {
  taskId?: string;
  year: number;
  month: number;
  day?: number;
}

// Get Entries
export async function getEntries(params: GetEntriesParams) {
  const { taskId, year, month, day } = params;

  try {
    const response: AxiosResponse<IEntry[]> = await axios.get(
      `${BASE_URL}/entries`,
      {
        params: {
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
export async function updateEntryStatus(entryId: string, status: Status) {
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
