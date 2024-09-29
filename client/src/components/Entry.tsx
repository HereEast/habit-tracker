import { useEffect, useState } from "react";

import { useAppContext } from "~/hooks";
import { cn, statusColor } from "~/utils";
import { IEntry } from "~/~/models/Entry";

interface EntryProps {
  entry: IEntry;
}

export function Entry({ entry }: EntryProps) {
  const { selectedEntryId, setSelectedEntryId, selectedRating, today } =
    useAppContext();

  const [currentRating, setCurrentRating] = useState(entry.status);

  useEffect(() => {
    if (
      selectedEntryId === entry._id &&
      selectedRating !== null &&
      selectedRating !== undefined
    ) {
      setCurrentRating(selectedRating);
    }
  }, [selectedRating, selectedEntryId, entry._id]);

  const isTodayEntry = today.todayDay === entry.day;

  function handleClick() {
    if (isTodayEntry) {
      setSelectedEntryId(selectedEntryId === entry._id ? null : entry._id);
    }
  }

  return (
    <div
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-[4px] bg-stone-300/50 text-sm",
        currentRating > 0 && statusColor(currentRating),
        isTodayEntry && "hover:border hover:border-brown-600",
        selectedEntryId === entry._id
          ? "border border-brown-600"
          : "border-none",
      )}
      onClick={handleClick}
      title={`Rate: ${String(entry.status)}`}
    >
      {currentRating}
    </div>
  );
}
