import { AxiosError } from "axios";

export function handleApiError(error: unknown) {
  if (error instanceof AxiosError) {
    console.log("🔴 Error:", error.response?.data.message);

    throw new Error(error.response?.data.message);
  }
}
