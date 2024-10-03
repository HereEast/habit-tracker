import { useEffect, useState } from "react";

import { useMonthContext } from "./useMonthContext";
import { calculateStatusPercentage } from "~/utils";
import { IEntry, Status } from "~/~/models/Entry";

interface UseMonthRatingProps {
  entriesData: IEntry[];
  monthEntryRatings: Status[];
}

export function useMonthRating({
  entriesData,
  monthEntryRatings,
}: UseMonthRatingProps) {
  const { selectedEntryId, selectedRating } = useMonthContext();

  const [monthPercentage, setMonthPercentage] = useState(0);

  useEffect(() => {
    if (!selectedEntryId) {
      return;
    }

    const clickedEntry = entriesData?.find(
      (entry) => entry._id === selectedEntryId,
    );

    const currentRating = clickedEntry?.status;

    if (currentRating) {
      if (selectedRating) {
        const index = monthEntryRatings.indexOf(currentRating);

        const updatedRatings = [...monthEntryRatings];
        updatedRatings[index] = selectedRating;

        const percentage = calculateStatusPercentage(updatedRatings);

        setMonthPercentage(percentage);
        return;
      }
    }
  }, [selectedEntryId, entriesData, selectedRating, monthEntryRatings]);

  return { monthPercentage, setMonthPercentage };
}
