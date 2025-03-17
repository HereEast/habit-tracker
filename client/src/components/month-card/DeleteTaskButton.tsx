import { XMarkIcon } from "@heroicons/react/24/outline";

import { useDeleteTask } from "~/hooks/mutations/useDeleteTask";
import { Button } from "../ui";

interface DeleteTaskButtonProps {
  taskId: string;
  createdAt: Date;
}

export function DeleteTaskButton({ taskId, createdAt }: DeleteTaskButtonProps) {
  const { mutate: deleteTask } = useDeleteTask();

  function handleDelete() {
    deleteTask({ taskId, createdAt });
  }

  return (
    <Button
      size="icon"
      className="bg-brown-500 hover:bg-brown-400 size-entry flex cursor-pointer items-center justify-center rounded-sm transition"
      onClick={handleDelete}
    >
      <XMarkIcon className="text-brown-900 size-5" />
    </Button>
  );
}
