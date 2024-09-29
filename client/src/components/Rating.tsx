import { Button } from "./ui/Button";

import { useMonthContext } from "~/hooks";
import { STATUSES } from "~/utils";
import { updateEntryStatus } from "~/api/entries";
import { Status } from "~/~/models/Entry";

export function Rating() {
  const { selectedEntryId, setSelectedEntryId, setSelectedRating } =
    useMonthContext();

  async function handleSetRating(status: Status) {
    if (selectedEntryId) {
      setSelectedRating(status);

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
