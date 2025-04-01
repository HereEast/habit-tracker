import { FocusEvent } from "react";

import { useMonthContext } from "~/hooks";
import { IEntry } from "~/utils/types/data";
import { cn, isValidEntry, statusColor } from "~/utils/helpers";

interface EntryProps {
  entry?: IEntry;
}

export function Entry({ entry }: EntryProps) {
  const { selectedEntry, setSelectedEntry } = useMonthContext();

  const entryId = entry?._id || "";
  const isEntryValid = isValidEntry(entry);

  function handleClick() {
    if (isEntryValid) {
      const value = selectedEntry !== entryId ? entryId : null;
      setSelectedEntry(value);
    }
  }

  function handleBlur(e: FocusEvent<HTMLButtonElement>) {
    const isStatusButton = e.relatedTarget
      ?.closest("button")
      ?.id.includes("status-button");

    if (!isStatusButton) {
      setSelectedEntry(null);
    }
  }

  return (
    <button
      id={`entry-${entryId}`}
      className={cn(
        "size-entry flex shrink-0 cursor-default items-center justify-center rounded-sm border bg-stone-300/50 text-sm",
        entry && statusColor(entry?.status),
        !entry && "opacity-20",
        isEntryValid && "hover:border-brown-900/100 hover:cursor-pointer",
        selectedEntry === entryId ? "border-brown-900" : "border-brown-900/0",
      )}
      onClick={handleClick}
      onBlur={handleBlur}
    />
  );
}
