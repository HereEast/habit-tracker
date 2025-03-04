// Is current month
export function isCurrentMonth(year: number, month: number) {
  const { year: currentYear, month: currentMonth } = getToday();

  return year === currentYear && month === currentMonth;
}

// Get number of dys in a month
export function getDaysInMonth(month: number, year: number) {
  return new Date(year, month, 0).getDate();
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

  return months[index - 1];
}

// Get today
export function getToday() {
  const today = new Date();

  return {
    day: today.getDate(),
    month: today.getMonth() + 1,
    year: today.getFullYear(),
  };
}
