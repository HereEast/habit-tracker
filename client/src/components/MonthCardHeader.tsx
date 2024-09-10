import { useAppContext } from "~/hooks";
import { useDayEntries } from "~/hooks/useDayEntries";
import { cn, getDateDetails } from "~/utils";

interface MonthCardHeaderProps {
  title: string;
  classes?: string;
}

export function MonthCardHeader({ title, classes }: MonthCardHeaderProps) {
  const { userId } = useAppContext();

  const today = new Date();
  const { year, month, day } = getDateDetails(today);

  // const { data, isLoading, error } = useDayEntries(userId, year, month, day);

  return (
    <div className={cn(classes)}>
      <h2 className="text-xl font-semibold capitalize">{title}</h2>
    </div>
  );
}
