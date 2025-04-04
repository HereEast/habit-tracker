import { Entry } from "./Entry";

import { IEntry } from "~/utils/types/data";
import { getDaysInMonth } from "~/utils/helpers";

export interface TaskEntriesProps {
  entries: IEntry[];
  year: number;
  month: number;
}

const MAX_DAYS = 31;

export function TaskEntries(input: TaskEntriesProps) {
  const { entries } = input;

  const daysInMonth = getDaysInMonth(input.month, input.year);

  const emptyEntries = new Array(daysInMonth - (entries?.length || 0)).fill(0);
  const restEntries = new Array(MAX_DAYS - daysInMonth).fill(0);

  return (
    <div>
      <div className="flex gap-0.5">
        {emptyEntries.map((_, i) => (
          <Entry key={i} />
        ))}

        {entries?.map((entry) => <Entry entry={entry} key={entry._id} />)}

        {/* Rest days */}
        {restEntries.map((_, i) => (
          <Entry key={i} />
        ))}
      </div>
    </div>
  );
}
