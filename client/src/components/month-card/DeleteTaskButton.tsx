import { useDeleteTask } from "~/hooks/mutations/useDeleteTask";

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
    <button
      className="bg-brown-500 hover:bg-brown-400 size-entry cursor-pointer items-center justify-center rounded-xs transition"
      onClick={handleDelete}
    >
      X
    </button>
  );
}
