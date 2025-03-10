import { useParams } from "react-router-dom";

import { Notice } from "~/components/Notice";
import { StatusButtons } from "~/components/StatusButtons";
import { MonthCard } from "~/components/month-card/MonthCard";
import { MonthContextProvider } from "~/contexts";

import {
  useCurrentMonthData,
  useTimelineData,
} from "~/hooks/queries/useTimelineData";
import { useUser } from "~/hooks/queries/useUser";
import { getToday } from "~/utils/helpers";

export function Timeline() {
  const { slug } = useParams();

  const { currentYear } = getToday();

  const { data: user } = useUser(slug!);
  const userId = String(user?._id || "");

  const { data: timeline } = useTimelineData(userId, currentYear);
  const { data: currenMonthData, isLoading: isCurrentMonthLoading } =
    useCurrentMonthData(userId);

  return (
    <div className="pt-10">
      <div className="flex flex-col items-center gap-6">
        <MonthContextProvider>
          <StatusButtons />

          {/* Current Month */}
          <div className="mb-6">
            {isCurrentMonthLoading && <Notice>Loading...</Notice>}
            {currenMonthData && (
              <MonthCard year={currentYear} monthData={currenMonthData} />
            )}
          </div>

          {/* Prev Months */}
          <div className="space-y-6">
            {timeline?.map((data, index) => (
              <MonthCard year={currentYear} monthData={data} key={index} />
            ))}
          </div>
        </MonthContextProvider>
      </div>
    </div>
  );
}
