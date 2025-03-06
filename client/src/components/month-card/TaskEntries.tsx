import { Entry } from "./Entry";

import { useMonthEntriesByTask } from "~/hooks/queries";
import { IEntry } from "~/server/models/Entry";
import { getDaysInMonth } from "~/utils/handlers";

export interface TaskEntriesProps {
  entries: IEntry[];
  year: number;
  month: number;
}

export function TaskEntries(input: TaskEntriesProps) {
  // const { data: entries } = useMonthEntriesByTask(input);
  const { entries, year, month } = input;

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

// export function TaskEntries(input: TaskEntriesProps) {
//   const { data: entries } = useMonthEntriesByTask(input);

//   const daysInMonth = getDaysInMonth(input.month, input.year);
//   const emptyEntries = new Array(daysInMonth - (entries?.length || 0)).fill(0);

//   return (
//     <div>
//       <div className="flex gap-0.5">
//         {emptyEntries.map((_, i) => (
//           <Entry key={i} />
//         ))}

//         {entries?.map((entry) => (
//           <Entry entry={entry} key={String(entry._id)} />
//         ))}
//       </div>
//     </div>
//   );
// }
