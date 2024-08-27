import { useEffect, useState } from "react";

interface ToDo {
  _id: string;
  user: string;
  todo: string;
  status: string;
  dateCreated: Date;
  dateDeleted: string;
  dateUpdated: string;
}

export default function Home() {
  console.log("Hello");

  const [todos, setTodos] = useState<ToDo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("http://localhost:5050/api"); 
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setTodos(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTodos(); 
  }, []);

  return (
    <main className={"flex min-h-screen flex-col items-center justify-between p-24"}>
      <p className="bg-red-300 px-6 py-2">Test again 2222</p>
      <p>{todos[0]?.todo}</p>
    </main>
  );
}
