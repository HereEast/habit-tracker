import axios, { AxiosResponse } from "axios";

import { BASE_URL } from "~/utils/constants";
import { handleApiError } from "~/utils/helpers/api";
import { CreateUserInput, IUser } from "~/utils/types";

export async function getUser(slug: string) {
  try {
    const response: AxiosResponse<IUser> = await axios.get(
      `${BASE_URL}/api/users/${slug}`,
    );

    const data = response.data;
    return data;
  } catch (err) {
    handleApiError(err);
  }
}

// Create user
export async function createUser(input: CreateUserInput) {
  const { email, username, password } = input;
  try {
    const response: AxiosResponse<{ token: string }> = await axios.post(
      `${BASE_URL}/api/users`,
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
    handleApiError(err);
  }
}
