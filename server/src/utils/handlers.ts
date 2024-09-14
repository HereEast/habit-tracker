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

// Get days in month
export function getDaysInMonth(month: number, year: number) {
  return new Date(year, month, 0).getDate();
}
