import mongoose from "mongoose";

import { useAppContext } from "~/hooks";
import { cn } from "~/utils";

interface EntryBoxProps {
  id?: mongoose.Types.ObjectId;
}

export function EntryBox({ id }: EntryBoxProps) {
  const { setSelectedEntry } = useAppContext();

  function noop() {}

  return (
    <div
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-[4px] bg-stone-300/50 text-sm",
        !id && "bg-transparent",
      )}
      onClick={() => (id ? setSelectedEntry(id) : noop())}
    />
  );
}
