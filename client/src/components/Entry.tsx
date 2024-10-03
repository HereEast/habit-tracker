import { useEffect, useState } from "react";

import { useAppContext, useMonthContext } from "~/hooks";
import { cn, statusColor } from "~/utils";
import { IEntry } from "~/~/models/Entry";

interface EntryProps {
  entry: IEntry;
}

export function Entry({ entry }: EntryProps) {
  const { today } = useAppContext();

  const { selectedEntryId, setSelectedEntryId, selectedRating } =
    useMonthContext();

  const [currentRating, setCurrentRating] = useState(entry.status);

  useEffect(() => {
    const isRating = selectedRating !== null && selectedRating !== undefined;

    if (isRating && selectedEntryId === entry._id) {
      setCurrentRating(selectedRating);
    }
  }, [selectedRating, selectedEntryId, entry._id]);

  const isValidEntry = entry.day <= today.day && entry.day >= 1;

  function handleClick() {
    if (isValidEntry) {
      const id = selectedEntryId === entry._id ? null : entry._id;

      setSelectedEntryId(id);
    }
  }

  return (
    <div
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-[4px] bg-stone-300/50 text-sm",
        currentRating > 0 && statusColor(currentRating),
        isValidEntry && "hover:border hover:border-brown-600",
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
