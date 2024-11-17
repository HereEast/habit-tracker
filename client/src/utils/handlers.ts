import { AxiosError } from "axios";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { Status } from "./types";

// Filter ratings on Delete
export function filterDeletedRatings(
  currentRatings: Status[],
  deletedRatings: Status[],
) {
  const result = [...currentRatings];

  deletedRatings.forEach((rating) => {
    const index = result.indexOf(rating);

    if (index !== -1) {
      result.splice(index, 1);
    }
  });

  return result;
}

// Handle request error
export function handleRequestError(err: Error) {
  if (err instanceof AxiosError && err.response) {
    console.log("🔴 Error:", err.response.data.message);

    throw new Error(err.response.data.message);
  }
}

// Status color
export const statusColor = (status: Status): string => {
  if (status === 0) {
    return "bg-stone-300/50";
  } else if (status === 1 || status === 2) {
    return "bg-stone-400/50";
  } else if (status === 3 || status === 4) {
    return "bg-stone-400";
  } else if (status === 5 || status === 6) {
    return "bg-stone-500";
  } else if (status === 7 || status === 8) {
    return "bg-stone-600";
  } else if (status === 9 || status === 10) {
    return "bg-stone-800";
  } else {
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
  return new Date(year, month, 0).getDate();
}

// Tw
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
