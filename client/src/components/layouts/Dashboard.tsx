import { useContext, useState } from "react";

import { Button } from "../ui/Button";
import { MonthCard } from "../MonthCard";
import { useAppContext } from "~/hooks";

const ratingRange = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export function Dashboard() {
  const year = new Date().getFullYear();
  const month = new Date().getMonth();

  return (
    <div className="flex flex-col items-center gap-6">
      <Rating />
      <MonthCard year={year} month={month} />
    </div>
  );
}

export function Rating() {
  const { selectedEntry, setSelectedEntry } = useAppContext();

  function handleSetRating(option: number) {
    console.log("Rate:", option);

    // Update status
    // Set selectedEntry to null
  }

  return (
    <div className="flex gap-2 rounded-lg bg-brown-100/20 p-4">
      {ratingRange.map((option) => (
        <Button
          key={option}
          classes="flex size-10 items-center justify-center rounded-md bg-brown-100 text-brown-800 hover:bg-brown-800 hover:text-brown-50"
          onClick={() => handleSetRating(option)}
        >
          {option}
        </Button>
      ))}
    </div>
  );
}
