import mongoose from "mongoose";
import axios, { AxiosResponse } from "axios";

import { BASE_URL, handleRequestError } from "~/utils";
import { IEntry, Status } from "~/~/models/Entry";

type UpdateResponse = {
  message: string;
};

interface GetEntriesParams {
  userId: string;
  year: number;
  month: number;
  day?: number;
  taskId?: mongoose.Types.ObjectId;
}

// Get Entries
export async function getEntries(params: GetEntriesParams) {
  const { userId, taskId, year, month, day } = params;

  try {
    const response: AxiosResponse<IEntry[]> = await axios.get(
      `${BASE_URL}/entries/${userId}`,
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

// Get month entries by task ID
// export async function getMonthEntriesByTaskId(
//   userId: string,
//   taskId: mongoose.Types.ObjectId,
//   year: number,
//   month: number,
// ) {
//   try {
//     const response: AxiosResponse<IEntry[]> = await axios.get(
//       `${BASE_URL}/entries/${userId}/${taskId}`,
//       {
//         params: {
//           year,
//           month,
//         },
//       },
//     );

//     const data = response.data;

//     return data;
//   } catch (err) {
//     if (err instanceof Error) {
//       handleRequestError(err);
//     }
//   }
// }

// All users entries by day
// export async function getUserEntriesByDay(
//   userId: string,
//   year: number,
//   month: number,
//   day: number,
// ) {
//   try {
//     const response: AxiosResponse<IEntry[]> = await axios.get(
//       `${BASE_URL}/entries/day/${userId}`,
//       {
//         params: {
//           year,
//           month,
//           day,
//         },
//       },
//     );

//     const data = response.data;

//     return data;
//   } catch (err) {
//     if (err instanceof Error) {
//       handleRequestError(err);
//     }
//   }
// }
