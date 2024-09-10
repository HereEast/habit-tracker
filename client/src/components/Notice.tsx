import { cn } from "~/utils";

interface NoticeProps {
  text: string;
  classes?: string;
}

export function Notice({ text, classes }: NoticeProps) {
  return (
    <div
      className={cn(
        "flex w-full justify-center rounded-md border border-stone-300 p-4 text-sm",
        classes || "",
      )}
    >
      {text}
    </div>
  );
}
