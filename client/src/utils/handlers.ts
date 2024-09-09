import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { MonthType } from "~/~/utils/types";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

// Get a month name from index
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

// Get number of ays in a month
export function getDaysInMonth(month: number, year: number) {
  return new Date(year, month, 0).getDate();
}
