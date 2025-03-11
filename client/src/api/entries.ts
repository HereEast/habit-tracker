import axios, { AxiosError, AxiosResponse } from "axios";

import { BASE_URL } from "~/utils/constants";
import { UpdateEntryInput, IEntry } from "~/utils/types";

// Update entry status
export async function updateEntryStatus({ entryId, status }: UpdateEntryInput) {
  try {
    const response: AxiosResponse<IEntry> = await axios.patch(
      `${BASE_URL}/api/entries`,
      {
        entryId,
        status,
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
