import { Task } from "./Task";

import { ITask } from "~/~/models/Task";

// Task List
interface TaskListProps {
  tasks: ITask[];
  year: number;
  month: number;
}

export function TaskList({ tasks, year, month }: TaskListProps) {
  return (
    <div className="space-y-0.5">
      {tasks.map((task) => (
        <Task
          taskId={task._id}
          title={task.title}
          year={year}
          month={month}
          key={String(task._id)}
        />
      ))}
    </div>
  );
}
