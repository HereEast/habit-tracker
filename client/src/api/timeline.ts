import axios, { AxiosError, AxiosResponse } from "axios";

import { BASE_URL } from "~/utils/constants";
import { IYearData } from "~/utils/types";

export async function getYearData(userId: string, year: number) {
  try {
    const response: AxiosResponse<IYearData> = await axios.get(
      `${BASE_URL}/api/timeline`,
      {
        params: {
          userId,
          year,
        },
      },
    );

    const data = response.data;
    // const sortedMonths = data.months.sort((a, b) => b.month - a.month);

    // return {
    //   year: data.year,
    //   months: sortedMonths,
    // };

    return data;
  } catch (err) {
    if (err instanceof AxiosError && err.response) {
      console.log("🔴 Error:", err.response.data.message);

      throw new Error(err.response.data.message);
    }
  }
}
