import { useMonthContext } from "~/hooks/useMonthContext";
import { IEntry } from "~/server/models/Entry";
import { cn, statusColor } from "~/utils/handlers";

interface EntryProps {
  entry?: IEntry;
}

export function Entry({ entry }: EntryProps) {
  const { selectedEntry, setSelectedEntry } = useMonthContext();

  const entryId = String(entry?._id);

  function handleClick() {
    if (entry) {
      const value = selectedEntry !== entryId ? entryId : null;
      setSelectedEntry(value);
    }
  }

  return (
    <div
      className={cn(
        "flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-[4px] bg-stone-300/50 text-sm",
        !entry && "cursor-default opacity-30",
        // currentRating > 0 && statusColor(currentRating),
        // isValidEntry && "hover:border-brown-600 hover:border",
        selectedEntry === entryId ? "border-brown-600 border" : "border-none",
      )}
      onClick={handleClick}
      // title={`Rate: ${String(entry.status)}`}
    >
      {entry?.status}
    </div>
  );
}
