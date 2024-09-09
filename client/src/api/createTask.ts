export async function createTask(userId: string, title: string) {
  const newTask = {
    userId,
    title,
  };

  try {
    const response = await fetch("http://localhost:5050/api/tasks/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}
