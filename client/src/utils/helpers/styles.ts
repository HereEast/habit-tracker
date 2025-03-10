import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { Status } from "../types";

// import { Status } from "~/server/models/Entry";

// Status color
export const statusColor = (status: Status): string => {
  if (status === 0) {
    return "bg-stone-300/50";
  } else if (status === 1 || status === 2) {
    return "bg-stone-400/50";
  } else if (status === 3 || status === 4) {
    return "bg-stone-400";
  } else if (status === 5 || status === 6) {
    return "bg-stone-500";
  } else if (status === 7 || status === 8) {
    return "bg-stone-600";
  } else if (status === 9 || status === 10) {
    return "bg-stone-800";
  } else {
    return "bg-stone-300/50";
  }
};

// Classes
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
