import { useMonthContext } from "~/hooks/useMonthContext";
import { IEntry } from "~/server/models/Entry";
import { cn, isEntryValid, statusColor } from "~/utils/helpers";

interface EntryProps {
  entry?: IEntry;
}

export function Entry({ entry }: EntryProps) {
  const { selectedEntry, setSelectedEntry } = useMonthContext();

  const entryId = String(entry?._id);
  const isValidEntry = entry && isEntryValid(entry);

  function handleClick() {
    if (entry && isValidEntry) {
      const value = selectedEntry !== entryId ? entryId : null;
      setSelectedEntry(value);
    }
  }

  return (
    <div
      className={cn(
        "flex size-6 shrink-0 cursor-default items-center justify-center rounded-[4px] border bg-stone-300/50 text-sm",
        entry && statusColor(entry?.status),
        !entry && "opacity-30",
        isValidEntry && "hover:border-stone-600/100",
        selectedEntry === entryId ? "border-brown-600" : "border-brown-600/0",
      )}
      onClick={handleClick}
    >
      {entry?.status}
    </div>
  );
}
