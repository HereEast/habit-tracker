export type StatusType = 0 | 1 | 2 | 3 | 4 | 5;
export type MonthType =
  | "january"
  | "february"
  | "march"
  | "april"
  | "may"
  | "june"
  | "july"
  | "august"
  | "september"
  | "october"
  | "november"
  | "december";

//

const Task = {
  _id: "123",
  userId: "222333",
  title: "Reading",
  // Data updated: create task, update task, stop task
  // Task copied + data renewed: new month
  data: {
    "1": { status: 0, invalid: true, disabled: true },
    "2": { status: 0, invalid: true, disabled: true },
    "3": { status: 0, invalid: true, disabled: true },
  },
  stopped: Date,
};

const user = {
  username: "",
  timeline: {
    2024: {
      months: {
        september: [Task],
      },
    },
  },
};
