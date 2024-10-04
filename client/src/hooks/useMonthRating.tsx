import { useEffect, useState } from "react";

import { useMonthContext } from "./useMonthContext";
import { calculateStatusPercentage } from "~/utils";
import { IEntry, Status } from "~/~/models/Entry";

interface UseMonthRatingProps {
  entriesMonthData: IEntry[];
  monthEntryRatings: Status[];
}

export function useMonthRating({
  entriesMonthData,
  monthEntryRatings,
}: UseMonthRatingProps) {
  const { selectedEntryId, selectedRating } = useMonthContext();

  const [monthPercentage, setMonthPercentage] = useState(0);

  useEffect(() => {
    if (!selectedEntryId) return;

    const clickedEntry = entriesMonthData?.find(
      (entry) => String(entry._id) === selectedEntryId,
    );

    const currentRating = clickedEntry?.status;
    const isCurrentRatingValid =
      currentRating !== null && currentRating !== undefined;

    if (isCurrentRatingValid) {
      if (selectedRating !== null) {
        const index = monthEntryRatings.indexOf(currentRating);

        const updatedRatings = [...monthEntryRatings];
        updatedRatings[index] = selectedRating;

        const percentage = calculateStatusPercentage(updatedRatings);

        setMonthPercentage(percentage);
        return;
      }
    }
  }, [selectedEntryId, entriesMonthData, selectedRating, monthEntryRatings]);

  return { monthPercentage, setMonthPercentage };
}
