import axios, { AxiosError, AxiosResponse } from "axios";

import { BASE_URL } from "~/utils/constants";
import { IYearData } from "~/utils/types";

export async function getUserYear(year: number) {
  try {
    const response: AxiosResponse<IYearData> = await axios.get(
      `${BASE_URL}/users/timeline/${year}`,
    );

    const data = response.data;
    const sortedMonths = data.months.sort((a, b) => b.month - a.month);

    return {
      year: data.year,
      months: sortedMonths,
    };
  } catch (err) {
    if (err instanceof AxiosError && err.response) {
      console.log("🔴 Error:", err.response.data.message);

      throw new Error(err.response.data.message);
    }
  }
}
