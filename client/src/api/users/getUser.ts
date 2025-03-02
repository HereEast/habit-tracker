import axios, { AxiosError, AxiosResponse } from "axios";

import { IUser } from "~/server/models/User";
import { BASE_URL } from "~/utils/constants";

export async function getUser(slug: string) {
  try {
    const response: AxiosResponse<IUser> = await axios.get(
      `${BASE_URL}/users/${slug}`,
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
