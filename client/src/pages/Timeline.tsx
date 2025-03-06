import { useParams } from "react-router-dom";

import { CreateTaskForm } from "~/components/CreateTaskForm";
import { MonthCardHeader } from "~/components/month-card/MonthCardHeader";
import { MonthDays } from "~/components/month-card/MonthDays";
import { TaskEntries } from "~/components/month-card/TaskEntries";
import { Notice } from "~/components/Notice";
import { RatingButtons } from "~/components/RatingButtons";

import { useUser, useYearData } from "~/hooks/queries";
import { getToday, isCurrentMonth } from "~/utils/handlers";
import { IEntry } from "~/server/models/Entry";

export function Timeline() {
  const { slug } = useParams();

  const { currentYear } = getToday();

  const { data: user } = useUser(slug!);
  const { data: timeline } = useYearData(String(user?._id || ""), currentYear);

  console.log("TIMELINE", timeline);

  return (
    <div className="flex flex-col items-center gap-6">
      <RatingButtons />

      <div>
        {timeline?.map((data, index) => (
          <div
            className="w-fit min-w-[680px] rounded-xl bg-stone-100/75 p-6"
            key={index}
          >
            <MonthCardHeader year={currentYear} month={data.month} />
            <MonthDays year={currentYear} month={data.month} />

            <div>
              {data.tasks?.length === 0 && (
                <Notice text="You haven't created any tasks yet." />
              )}
            </div>

            {data.tasks && (
              <ul className="mb-6 space-y-0.5">
                {data.tasks.map(({ task }, index) => {
                  const monthEntries = task.entries as IEntry[];

                  return (
                    <li className="flex w-full items-center gap-6" key={index}>
                      <div className="w-32">
                        <h3>{task.title}</h3>
                      </div>

                      <TaskEntries
                        entries={monthEntries}
                        year={currentYear}
                        month={data.month}
                      />
                    </li>
                  );
                })}
              </ul>
            )}

            {/* Form */}
            {isCurrentMonth(currentYear, data.month) && <CreateTaskForm />}
          </div>
        ))}
      </div>
    </div>
  );
}

// export function Timeline() {
//   const { slug } = useParams();

//   const { currentMonth, currentYear } = getToday();

//   const { data: user, isError } = useUser(slug!);
//   const { data: tasks } = useUserTasks(String(user?._id || ""));

//   // Year data
//   const { data: timeline } = useYearData(String(user?._id || ""), currentYear);

//   console.log("TIMELINE", timeline);

//   return (
//     <div className="flex flex-col items-center gap-6">
//       <RatingButtons />

//       <div>
//         <div className="w-fit min-w-[680px] rounded-xl bg-stone-100/75 p-6">
//           <MonthCardHeader year={currentYear} month={currentMonth} />
//           <MonthDays year={currentYear} month={currentMonth} />

//           <div>
//             {tasks?.length === 0 && (
//               <Notice text="You haven't created any tasks yet." />
//             )}
//           </div>

//           {tasks && tasks?.length > 0 && (
//             <ul className="mb-6 space-y-0.5">
//               {tasks.map((task) => (
//                 <li
//                   className="flex w-full items-center gap-6"
//                   key={String(task._id)}
//                 >
//                   <div className="w-32">
//                     <h3>{task.title}</h3>
//                   </div>

//                   <TaskEntries
//                     userId={String(user?._id || "")}
//                     taskId={String(task._id)}
//                     year={currentYear}
//                     month={currentMonth}
//                   />
//                 </li>
//               ))}
//             </ul>
//           )}

//           {/* Form */}
//           {/* {isCurrentMonth(currentYear, data.month) && <div>Form</div>} */}

//           <CreateTaskForm />
//         </div>
//       </div>
//     </div>
//   );
// }
