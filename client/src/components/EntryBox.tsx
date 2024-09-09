import { cn } from "~/utils";

interface EntryBoxProps {
  invalid?: boolean;
}

export function EntryBox({ invalid = false }: EntryBoxProps) {
  return (
    <div
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-sm bg-stone-300/50 text-sm",
        invalid && "bg-transparent",
      )}
    />
  );
}
