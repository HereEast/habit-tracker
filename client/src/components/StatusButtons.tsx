import { useUpdateEntry } from "~/hooks/mutations/useUpdateEntry";
import { useMonthContext } from "~/hooks/useMonthContext";
import { STATUSES } from "~/utils/constants";
import { Status } from "~/utils/types";

export function StatusButtons() {
  const { selectedEntry, setSelectedEntry } = useMonthContext();

  const { mutate } = useUpdateEntry();

  function handleUpdateStatus(status: Status) {
    if (selectedEntry) {
      mutate({ entryId: selectedEntry, status });
      setSelectedEntry(null);
    }
  }

  return (
    <div className="bg-brown-100/20 flex gap-1 rounded-lg p-4">
      {STATUSES.map((status) => (
        <button
          key={status}
          className="bg-brown-100 text-brown-800 hover:bg-brown-800 hover:text-brown-50 flex size-10 h-10 cursor-pointer items-center justify-center rounded-md px-5 transition"
          onClick={() => handleUpdateStatus(status as Status)}
        >
          {status}
        </button>
      ))}
    </div>
  );
}
