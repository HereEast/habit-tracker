interface DeleteTaskButtonProps {
  taskId: string;
}

export function DeleteTaskButton({ taskId }: DeleteTaskButtonProps) {
  function handleDelete() {
    console.log("Delete", taskId);
  }

  return (
    <button
      className="bg-brown-500 hover:bg-brown-400 size-6 cursor-pointer items-center justify-center rounded-[4px] transition"
      onClick={handleDelete}
    >
      X
    </button>
  );
}
