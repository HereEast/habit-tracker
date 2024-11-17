import { useEffect, useState } from "react";

import { useMonthContext } from "./context";
import { calculateStatusPercentage } from "~/utils/handlers";
import { IEntry, Status } from "~/utils/types";

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
      (entry) => entry._id === selectedEntryId,
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
