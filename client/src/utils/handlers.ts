import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { MonthType } from "~/~/utils/types";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export function getMonthFromIndex(index: number) {
  const months: MonthType[] = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  return months[index];
}

