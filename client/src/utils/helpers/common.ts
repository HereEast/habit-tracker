import { IEntry, Status } from "~/server/models/Entry";
import { getToday } from "./dates";

// Is entry active
export function isEntryValid(entry: IEntry) {
  const { currentDay, currentMonth, currentYear } = getToday();

  return (
    entry &&
    entry?.day <= currentDay &&
    entry.month === currentMonth &&
    entry.year === currentYear
  );
}

// Calculate % of done
export const MAX_STATUS: Status = 10;

export function calculateDonePercentage(statuses: Status[]) {
  if (!statuses.length) return 0;

  const totalPossibleScore = statuses.length * MAX_STATUS;

  const totalScore = statuses.reduce<number>((sum, status) => sum + status, 0);
  const percentage = (totalScore / totalPossibleScore) * 100;

  return Math.ceil(percentage);
}

// Get fire icon
export function getFireIcon(percent: number) {
  return "🔥".repeat(percent >= 80 ? 3 : percent >= 60 ? 2 : 1);
}
