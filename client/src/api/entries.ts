import axios, { AxiosError, AxiosResponse } from "axios";

import { BASE_URL } from "~/utils/constants";
import { IEntry, UpdateEntryInput } from "~/utils/types";

export interface MonthTaskEntriesInput {
  userId: string;
  taskId: string;
  year: number;
  month: number;
}

// Get month task Entries
// export async function getMonthEntriesByTask(input: MonthTaskEntriesInput) {
//   const { userId, taskId, year, month } = input;

//   try {
//     const response = await axios.get(`${BASE_URL}/api/entries`, {
//       params: {
//         userId,
//         taskId,
//         year,
//         month,
//       },
//     });

//     const data = response.data;

//     const result = {
//       ...data,
//       _id: String(data._id),
//     };

//     console.log(result);

//     return data;
//   } catch (err) {
//     if (err instanceof AxiosError) {
//       console.log("🔴 Error:", err.response?.data.message);

//       throw new Error(err.response?.data.message);
//     }
//   }
// }

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
