import { TaskType } from "~/schemas";

export async function getTasks(userId: string): Promise<TaskType[]> {
  try {
    const response = await fetch(`http://localhost:5050/api/tasks/${userId}`);

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);

    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
}
