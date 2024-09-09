import axios from "axios";

import { BASE_URL } from "~/utils";

// All users
export async function getUsers() {
  try {
    const response = await fetch(`${BASE_URL}/users`);

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

// User by ID
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

// User by ID
// export async function getUserById(userId: string) {
//   try {
//     const response = await axios.get(`${BASE_URL}/users`, {
//       params: userId,
//     });

//     if (response.status !== 200) {
//       throw new Error(`${response.status} ${response.statusText}`);
//     }

//     const data = response.data;
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// }

// User by ID
// export async function getUserBySlug(slug: string) {
//   try {
//     const response = await axios.get(`${BASE_URL}/users/${userId}`);

//     if (response.status !== 200) {
//       throw new Error(`${response.status} ${response.statusText}`);
//     }

//     const data = response.data;
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// }

// Get user tasks
// export async function getUserTasks(userId: string): ITask {
//   try {
//     const response = await axios.get(`${BASE_URL}/users/${userId}`);

//     if (response.status !== 200) {
//       throw new Error(`${response.status} ${response.statusText}`);
//     }

//     const data = response.data;
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// }
