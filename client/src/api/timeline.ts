import axios, { AxiosResponse } from "axios";

import { BASE_URL } from "~/utils/constants";
import { handleApiError } from "~/utils/helpers/api";
import { MonthTimelineData } from "~/utils/types";

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
    handleApiError(err);
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
    handleApiError(err);
  }
}
