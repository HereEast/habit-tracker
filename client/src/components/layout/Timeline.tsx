import { useNavigate } from "react-router-dom";

import { Notice } from "~/components/Notice";
import { StatusButtons } from "~/components/StatusButtons";
import { MonthCard } from "~/components/month-card/MonthCard";
import { MonthContextProvider } from "~/contexts";

import {
  useCurrentMonthData,
  useTimelineData,
} from "~/hooks/queries/useTimelineData";
import { useAuthContext } from "~/hooks/useAuthContext";
import { getToday } from "~/utils/helpers";

export function Timeline() {
  useNavigate();

  const { user } = useAuthContext();
  const { currentYear } = getToday();

  const userId = user?._id || "";

  const { data: timeline, isLoading: timelineIsLoading } = useTimelineData(
    userId,
    currentYear,
  );

  const { data: currenMonthData, isLoading: currentMonthIsLoading } =
    useCurrentMonthData(userId);

  const isLoading = timelineIsLoading || currentMonthIsLoading;

  return (
    <div className="py-10">
      <div className="flex flex-col items-center gap-10">
        <MonthContextProvider>
          <StatusButtons />

          {isLoading && <Notice classNames="w-full">Loading...</Notice>}

          <div className="flex flex-col items-center gap-6">
            {/* Current Month */}
            {currenMonthData && (
              <MonthCard year={currentYear} monthData={currenMonthData} />
            )}

            {/* Prev Months */}
            <div className="space-y-6">
              {timeline?.map((data, index) => (
                <MonthCard year={currentYear} monthData={data} key={index} />
              ))}
            </div>
          </div>
        </MonthContextProvider>
      </div>
    </div>
  );
}
