import { ReactNode } from "react";

import { cn } from "~/utils/helpers";

interface NoticeProps {
  children: ReactNode;
  isError?: boolean;
  classNames?: string;
}

export function Notice({ children, isError, classNames = "" }: NoticeProps) {
  return (
    <div
      className={cn(
        "flex w-full justify-center rounded-lg border border-stone-400 p-4 text-sm",
        isError && "border-red-600 text-red-600",
        classNames,
      )}
    >
      {children}
    </div>
  );
}
