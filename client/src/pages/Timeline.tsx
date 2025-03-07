import { useParams } from "react-router-dom";

import { RatingButtons } from "~/components/RatingButtons";
import { MonthCard } from "~/components/month-card/MonthCard";

import { useUser, useYearData } from "~/hooks/queries";
import { getToday } from "~/utils/handlers";

export function Timeline() {
  const { slug } = useParams();

  const { currentYear } = getToday();

  const { data: user } = useUser(slug!);
  const { data: timeline } = useYearData(String(user?._id || ""), currentYear);

  console.log("TIMELINE", timeline);

  return (
    <div className="flex flex-col items-center gap-6">
      <RatingButtons />

      <div className="space-y-6">
        {timeline?.map((data, index) => (
          <MonthCard year={currentYear} monthData={data} key={index} />
        ))}
      </div>
    </div>
  );
}
