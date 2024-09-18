import { useAppContext } from "~/hooks";
import { cn, statusColor } from "~/utils";

import { IEntry } from "~/~/models/Entry";

interface EntryProps {
  entry: IEntry;
}

export function Entry({ entry }: EntryProps) {
  const { selectedEntryId, setSelectedEntryId, today } = useAppContext();
  const { todayDay } = today;

  const isTodayEntry = todayDay === entry.day;

  function handleClick() {
    if (isTodayEntry) {
      setSelectedEntryId(selectedEntryId === entry._id ? null : entry._id);
    }
  }

  return (
    <div
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-[4px] bg-stone-300/50 text-sm",
        entry.status > 0 && statusColor(entry.status),
        isTodayEntry && "hover:border hover:border-brown-600",
        selectedEntryId === entry._id && "border border-brown-600",
      )}
      onClick={handleClick}
      title={`Rate: ${String(entry.status)}`}
    >
      {entry.status}
    </div>
  );
}
