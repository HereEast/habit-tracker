import axios from "axios";

import { BASE_URL } from "~/utils";

// Get user by ID
export async function getUserById(userId: string) {
  try {
    const response = await axios.get(`${BASE_URL}/users`, {
      params: userId,
    });

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
    const response = await axios.post(
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
    
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
