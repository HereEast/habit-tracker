import axios, { AxiosError, AxiosResponse } from "axios";

import { BASE_URL } from "~/utils/constants";
import { LoginInput } from "~/utils/types";

export async function login(input: LoginInput) {
  const { email, password } = input;

  try {
    const response: AxiosResponse<{ token: string }> = await axios.post(
      `${BASE_URL}/api/login`,
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
    if (err instanceof AxiosError) {
      console.log("🔴 Error:", err.response?.data.message);

      throw new Error(err.response?.data.message);
    }
  }
}
