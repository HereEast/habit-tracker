import { cn } from "~/utils";

interface EntryBoxProps {
  invalid?: boolean;
}

export function EntryBox({ invalid = false }: EntryBoxProps) {
  return (
    <div
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-sm bg-zinc-100 text-sm",
        invalid && "bg-zinc-50/50",
      )}
    />
  );
}
