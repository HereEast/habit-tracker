import { cn } from "~/utils";
import { ITask } from "~/~/models/Task";

interface TaskItemProps {
  task: ITask;
}

export function TaskItem({ task }: TaskItemProps) {
  return (
    <div className="flex w-full gap-6">
      <div className="w-28">{task.title}</div>

      {/* <div className="flex gap-1">
        {task..map((item) => (
          <div
            key={item.day}
            className={cn(
              "flex size-6 shrink-0 items-center justify-center rounded-sm bg-zinc-100 text-sm",
              item.invalid && "opacity-0",
            )}
          >
            {item.day}
          </div>
        ))}
      </div> */}
    </div>
  );
}
