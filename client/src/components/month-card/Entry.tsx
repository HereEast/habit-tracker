import { IEntry } from "~/server/models/Entry";
import { cn, statusColor } from "~/utils/handlers";

interface EntryProps {
  entry?: IEntry;
}

export function Entry({ entry }: EntryProps) {
  return (
    <div
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-[4px] bg-stone-300/50 text-sm",
        !entry && "opacity-30",
        // currentRating > 0 && statusColor(currentRating),
        // isValidEntry && "hover:border-brown-600 hover:border",
        // selectedEntryId === entry._id
        //   ? "border-brown-600 border"
        //   : "border-none",
      )}
      // onClick={handleClick}
      // title={`Rate: ${String(entry.status)}`}
    >
      {entry?.day}
    </div>
  );
}
