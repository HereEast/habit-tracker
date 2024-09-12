import axios from "axios";

import { BASE_URL } from "~/utils";

// Get user by ID
export async function getUserById(userId: string) {
  try {
    const response = await axios.get(`${BASE_URL}/users`, {
      params: userId,
    });

    if (response.status !== 200) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const data = response.data;
    return data;
  } catch (err) {
    console.log(err);
  }
}

// Create user
export async function createUser(
  username: string,
  email: string,
  password: string,
) {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

