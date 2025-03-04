import { cn } from "~/utils/handlers";

interface NoticeProps {
  text: string;
  isError?: boolean;
  classNames?: string;
}

export function Notice({ text, isError, classNames = "" }: NoticeProps) {
  return (
    <div
      className={cn(
        "flex w-full justify-center rounded-md border border-stone-300 p-4 text-sm",
        isError && "border-red-600 text-red-600",
        classNames,
      )}
    >
      {text}
    </div>
  );
}
