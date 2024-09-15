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
export const statusColor = (status: Status) => {
  const colorMap: { [key: number]: string } = {
    1: "bg-stone-400/50",
    2: "bg-stone-400/50",
    3: "bg-stone-400",
    4: "bg-stone-400",
    5: "bg-stone-500",
    6: "bg-stone-500",
    7: "bg-stone-600",
    8: "bg-stone-600",
    9: "bg-stone-800",
    10: "bg-stone-800",
  };

  return colorMap[status] || "bg-stone-300/50";
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
