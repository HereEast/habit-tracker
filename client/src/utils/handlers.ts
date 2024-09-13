import { AxiosError } from "axios";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { MonthType, StatusType } from "~/~/utils/types";

// Handle request error
export function handleRequestError(err: Error) {
  if (err instanceof AxiosError && err.response) {
    console.log("🔴 Error:", err.response.data.message);

    throw new Error(err.response.data.message);
  }
}

// Calculate % of accomplishment
export function calculateStatusPercentage(statuses: StatusType[] | undefined) {
  if (!statuses || statuses.length === 0) {
    return 0;
  }

  const maxStatusValue: StatusType = 5;
  const totalPossibleScore = statuses.length * maxStatusValue;

  const totalScore = statuses.reduce<number>((sum, status) => sum + status, 0);
  const percentage = (totalScore / totalPossibleScore) * 100;

  return percentage;
}

// Get date details
export function getDateDetails(date: Date) {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
}

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
  return new Date(year, month + 1, 0).getDate();
}

// Tw
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
