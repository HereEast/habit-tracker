import axios, { AxiosError, AxiosResponse } from "axios";

import { BASE_URL } from "~/utils/constants";
import { MonthTimelineData } from "~/utils/types";
// import { MonthTimelineData } from "~/server/utils/types";

// Current month
export async function getCurrentMonthData(userId: string) {
  try {
    const response: AxiosResponse<MonthTimelineData> = await axios.get(
      `${BASE_URL}/api/timeline/month`,
      {
        params: {
          userId,
        },
      },
    );

    const data = response.data;

    return data;
  } catch (err) {
    if (err instanceof AxiosError && err.response) {
      console.log("🔴 Error:", err.response.data.message);

      throw new Error(err.response.data.message);
    }
  }
}

// Year
export async function getTimelineData(userId: string, year: number) {
  try {
    const response: AxiosResponse<MonthTimelineData[]> = await axios.get(
      `${BASE_URL}/api/timeline`,
      {
        params: {
          userId,
          year,
        },
      },
    );

    const data = response.data;

    return data;
  } catch (err) {
    if (err instanceof AxiosError && err.response) {
      console.log("🔴 Error:", err.response.data.message);

      throw new Error(err.response.data.message);
    }
  }
}
