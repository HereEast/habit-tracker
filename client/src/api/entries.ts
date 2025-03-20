import axios, { AxiosResponse } from "axios";

import { BASE_URL } from "~/utils/constants";
import { handleApiError } from "~/utils/helpers/api";
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
    handleApiError(err);
  }
}
