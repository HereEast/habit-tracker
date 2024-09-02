export async function createUser() {
  const newUser = {
    username: "kate",
    email: "kate@test.com",
    password: "12345",
  };

  try {
    const response = await fetch("http://localhost:5050/api/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
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
