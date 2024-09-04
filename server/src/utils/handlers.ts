import { MonthType } from "./types.js";

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

export function getDaysInMonth(month: number, year: number) {
  return new Date(year, month, 0).getDate();
}
