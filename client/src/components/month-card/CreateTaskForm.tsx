import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";

import { useCreateTask } from "~/hooks/mutations/useCreateTask";
import { useUser } from "~/hooks/queries/useUser";
import { Button } from "../ui/Button";

export function CreateTaskForm() {
  const { slug } = useParams();

  const [value, setValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  const { data: user } = useUser(slug!);
  const { mutate: createTask } = useCreateTask();

  // Submit task
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!value.trim()) return;

    createTask({ userId: user?._id, title: value });
    setValue("");
  }

  return (
    <>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="flex gap-2">
          <div className="relative w-full">
            <input
              name="new-task"
              value={value}
              placeholder="New task..."
              required={true}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setIsFocus(true)}
              className="border-brown-400 placeholder:text-brown-500 focus:border-brown-900 h-10 w-full border px-4 outline-0"
            />

            {isFocus && value && (
              <Button
                type="button"
                className="hover:bg-brown-900/10 text-brown-900 absolute top-1 right-1 size-8 bg-transparent"
                onClick={() => {
                  setValue("");
                  setIsFocus(false);
                }}
              >
                X
              </Button>
            )}
          </div>

          <Button>Create</Button>
        </div>
      </form>
    </>
  );
}
