export async function getUsers() {
  try {
    const response = await fetch("http://localhost:5050/api/users");

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
