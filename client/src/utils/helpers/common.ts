import { getToday } from "./dates";
import { IEntry, Status } from "../types";

// Is valid password
export function isValidPassword(password: string) {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
}

// Is entry active
export function isValidEntry(entry?: IEntry) {
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

// Current month query keys
export function getCurrentMonthQueryKeys() {
  const { currentMonth } = getToday();

  return ["current-month", currentMonth];
}

// Capitalize
export function capitalize(string: string) {
  return `${string[0].toUpperCase()}${string.slice(1).toLowerCase()}`;
}

// Get fire icon
export function getFireIcon(percent: number) {
  return "🔥".repeat(percent >= 80 ? 3 : percent >= 60 ? 2 : 1);
}
