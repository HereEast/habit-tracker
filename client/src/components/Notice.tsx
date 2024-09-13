import { cn } from "~/utils";

interface NoticeProps {
  text: string;
  isError?: boolean;
  classes?: string;
}

export function Notice({ text, isError, classes }: NoticeProps) {
  return (
    <div
      className={cn(
        "flex w-full justify-center rounded-md border border-stone-300 p-4 text-sm",
        isError && "border-red-600 text-red-600",
        classes || "",
      )}
    >
      {text}
    </div>
  );
}
