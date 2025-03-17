import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { Button, Input } from "~/components/ui";
import { useCreateTask } from "~/hooks/mutations/useCreateTask";
import { useUser } from "~/hooks/queries/useUser";

export function CreateTaskForm() {
  const { slug } = useParams();

  const [value, setValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  const { data: user } = useUser(slug!);
  const { mutate: createTask } = useCreateTask();

  const userId = user?._id || "";

  // Submit
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!value.trim()) return;

    createTask({ userId, title: value });
    setValue("");
  }

  return (
    <>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="flex gap-2">
          <div className="relative w-full">
            <Input
              name="task"
              value={value}
              placeholder="New task..."
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setIsFocus(true)}
              className="px-3"
            />

            {isFocus && value && (
              <Button
                type="button"
                size="icon"
                className="hover:bg-brown-900/10 text-brown-900 absolute top-1 right-1 size-8 bg-transparent p-0"
                onClick={() => {
                  setValue("");
                  setIsFocus(false);
                }}
              >
                <XMarkIcon className="size-5" />
              </Button>
            )}
          </div>

          <Button>Create</Button>
        </div>
      </form>
    </>
  );
}
