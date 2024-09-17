import axios, { AxiosResponse } from "axios";

import { BASE_URL, handleRequestError } from "~/utils";
import { IUser } from "~/~/models/User";

// Get user by ID
export async function getUser(userId: string) {
  try {
    const response: AxiosResponse<IUser> = await axios.get(
      `${BASE_URL}/users/${userId}`,
    );

    const data = response.data;

    return data;
  } catch (err) {
    if (err instanceof Error) {
      handleRequestError(err);
    }
  }
}

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
