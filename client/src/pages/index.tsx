import { Button } from "~/components/Button";
import { Input } from "~/components/Input";

import { UseTasks } from "~/hooks";

const ID = "66d0db0c810e60d1f8a7c9d8";

export default function Home() {
  const { data, isLoading, error } = UseTasks(ID);

  function handleCreateTask() {}

  if (isLoading) {
    return <div className="w-full rounded-md border p-3">Loading...</div>;
  }

  if (error) {
    return (
      <div className="w-full rounded-md border p-3">Something went wrong.</div>
    );
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center p-24">
      <div className="mb-10 w-full">
        <h2>Tasks, September 2024</h2>

        {data.length === 0 && (
          <div className="w-full rounded-md border p-4">
            You haven't created any tasks yet.
          </div>
        )}
      </div>

      {/* <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("New task created.");
        }}
      > */}
      <div className="flex gap-2">
        <Input name="new-task" placeholder="New task..." />
        <Button name="Create" onClick={handleCreateTask} />
      </div>
      {/* </form> */}
    </main>
  );
}
