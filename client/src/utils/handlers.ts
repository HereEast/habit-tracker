import { AxiosError } from "axios";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { Status } from "~/~/models/Entry";

// Handle request error
export function handleRequestError(err: Error) {
  if (err instanceof AxiosError && err.response) {
    console.log("🔴 Error:", err.response.data.message);

    throw new Error(err.response.data.message);
  }
}

// Status color
export const statusColor = (status: Status): string => {
  switch (status) {
    case 0:
      return "bg-stone-300/50";
    case 1:
    case 2:
      return "bg-stone-400/50";
    case 3:
    case 4:
      return "bg-stone-400";
    case 5:
    case 6:
      return "bg-stone-500";
    case 7:
    case 8:
      return "bg-stone-600";
    case 9:
    case 10:
      return "bg-stone-800";
    default:
      return "bg-stone-300/50";
  }
};

// Calculate % of accomplishment
export function calculateStatusPercentage(statuses: Status[] | undefined) {
  if (!statuses || statuses.length === 0) {
    return 0;
  }

  const maxStatusValue: Status = 10;
  const totalPossibleScore = statuses.length * maxStatusValue;

  const totalScore = statuses.reduce<number>((sum, status) => sum + status, 0);
  const percentage = (totalScore / totalPossibleScore) * 100;

  return Math.round(percentage);
}

// Get date details
export function getDateDetails(date: Date) {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
}

// Get month from index
export function getMonthFromIndex(index: number) {
  const months = [
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
