import { Entry } from "./Entry";

import { useMonthEntriesByTask } from "~/hooks/queries";
import { getDaysInMonth } from "~/utils/handlers";

export interface TaskEntriesProps {
  userId: string;
  taskId: string;
  year: number;
  month: number;
}

export function TaskEntries(input: TaskEntriesProps) {
  const { data: entries } = useMonthEntriesByTask(input);

  const daysInMonth = getDaysInMonth(input.month, input.year);
  const emptyEntries = new Array(daysInMonth - (entries?.length || 0)).fill(0);

  return (
    <div>
      <div className="flex gap-0.5">
        {emptyEntries.map((_, i) => (
          <Entry key={i} />
        ))}

        {entries?.map((entry) => (
          <Entry entry={entry} key={String(entry._id)} />
        ))}
      </div>
    </div>
  );
}
