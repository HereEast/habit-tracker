// Get today
export function getToday() {
  const today = new Date();

  return {
    currentDay: today.getDate(),
    currentMonth: today.getMonth() + 1,
    currentYear: today.getFullYear(),
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

// Get days in month
export function getDaysInMonth(month: number, year: number) {
  return new Date(year, month, 0).getDate();
}
