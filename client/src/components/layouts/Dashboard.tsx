import { Button } from "../ui/Button";
import { MonthCard } from "../MonthCard";

import { useAppContext } from "~/hooks";
import { updateEntryStatus } from "~/api/entries";
import { Status } from "~/~/models/Entry";
import { STATUSES } from "~/utils";

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
  const { selectedEntryId, setSelectedEntryId } = useAppContext();

  async function handleSetRating(status: Status) {
    if (selectedEntryId) {
      await updateEntryStatus(selectedEntryId, status);
      setSelectedEntryId(null);
    }
  }

  return (
    <div className="flex gap-2 rounded-lg bg-brown-100/20 p-4">
      {STATUSES.map((status) => (
        <Button
          key={status}
          classes="flex size-10 items-center justify-center rounded-md bg-brown-100 text-brown-800 hover:bg-brown-800 hover:text-brown-50"
          onClick={() => handleSetRating(status as Status)}
        >
          {status}
        </Button>
      ))}
    </div>
  );
}
