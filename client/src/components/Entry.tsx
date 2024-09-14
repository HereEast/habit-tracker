import mongoose from "mongoose";

import { useAppContext } from "~/hooks";
import { cn, statusColor } from "~/utils";
import { Status } from "~/~/models/Entry";

interface EntryProps {
  id: mongoose.Types.ObjectId;
  status: Status;
}

export function Entry({ id, status }: EntryProps) {
  const { selectedEntryId, setSelectedEntryId } = useAppContext();

  return (
    <div
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-[4px] bg-stone-300/50 text-sm",
        status > 0 && statusColor(status),
        selectedEntryId === id && "border border-brown-600",
      )}
      onClick={() => setSelectedEntryId(id)}
    >
      {status}
    </div>
  );
}
