import { useParams } from "react-router-dom";

import { Notice } from "~/components/Notice";
import { RatingButtons } from "~/components/RatingButtons";
import { MonthCard } from "~/components/month-card/MonthCard";
import { MonthContextProvider } from "~/contexts";

import { useCurrentMonthData, useUser, useYearData } from "~/hooks/queries";
import { getToday } from "~/utils/handlers";

export function Timeline() {
  const { slug } = useParams();

  const { currentYear } = getToday();

  const { data: user } = useUser(slug!);
  const userId = String(user?._id || "");

  const { data: timeline } = useYearData(userId, currentYear);
  const { data: currenMonthData, isLoading: isCurrentMonthLoading } =
    useCurrentMonthData(userId);

  return (
    <div className="flex flex-col items-center gap-6">
      <MonthContextProvider>
        <RatingButtons />

        <div className="mb-6">
          {isCurrentMonthLoading && <Notice>Loading...</Notice>}
          {currenMonthData && (
            <MonthCard year={currentYear} monthData={currenMonthData} />
          )}
        </div>
      </MonthContextProvider>

      <div className="space-y-6">
        {timeline?.map((data, index) => (
          <MonthCard year={currentYear} monthData={data} key={index} />
        ))}
      </div>
    </div>
  );
}
