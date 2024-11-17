import axios, { AxiosResponse } from "axios";

import { BASE_URL } from "~/utils/constants";
import { handleRequestError } from "~/utils/handlers";
import { ITask, IUser } from "~/utils/types";

export interface IMonthData {
  month: number;
  tasks: ITask[];
}

export interface IYearData {
  year: number;
  months: IMonthData[];
}

// Get year data
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
    if (err instanceof Error) {
      handleRequestError(err);
    }
  }
}

// Get user by ID
// export async function getUser(userId: string) {
//   try {
//     const response: AxiosResponse<IUser> = await axios.get(
//       `${BASE_URL}/users/${userId}`,
//     );

//     const data = response.data;

//     return data;
//   } catch (err) {
//     if (err instanceof Error) {
//       handleRequestError(err);
//     }
//   }
// }

// Create user
export async function createUser(
  username: string,
  email: string,
  password: string,
) {
  try {
    const response: AxiosResponse<IUser> = await axios.post(
      `${BASE_URL}/users`,
      {
        username,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
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

// Login
export async function login(email: string, password: string) {
  try {
    const response: AxiosResponse<string> = await axios.post(
      `${BASE_URL}/users/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
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
