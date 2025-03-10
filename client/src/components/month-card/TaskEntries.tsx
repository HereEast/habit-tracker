import { Entry } from "./Entry";

import { getDaysInMonth } from "~/utils/helpers";
import { IEntry } from "~/utils/types";

export interface TaskEntriesProps {
  entries: IEntry[];
  year: number;
  month: number;
}

export function TaskEntries(input: TaskEntriesProps) {
  const { entries } = input;

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
