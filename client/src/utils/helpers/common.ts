import { IEntry } from "~/server/models/Entry";
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
