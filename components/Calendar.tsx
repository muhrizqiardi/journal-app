import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import CalendarSets from "dayjs-plugin-calendar-sets";
import Link from "next/link";

export default function Calendar() {
  dayjs.extend(CalendarSets);
  const calendarSets = dayjs.calendarSets().current();

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        {/* <p className="text-sm font-bold">Calendar - {dayjs().format("MMM YYYY")}</p> */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-sm m-1 inline-flex gap-2">
            <ChevronDownIcon className="w-3 h-3"></ChevronDownIcon>
            {dayjs().format("MMM YYYY")}
          </label>
          <div
            tabIndex={0}
            className="dropdown-content card card-compact w-64 p-2 shadow bg-base-200 text-primary-content"
          >
            <div className="card-body">
              <p className="card-title text-center">2022</p>
              <div className="grid grid-cols-3">
                {[
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ].map((month, index) => (
                  <div key={index} className="flex">
                    <button className="w-full btn btn-ghost">{month}</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="btn-group">
          <button className="btn btn-sm">
            <ChevronLeftIcon className="w-3 h-3" />
          </button>
          <button className="btn btn-sm">
            <ChevronRightIcon className="w-3 h-3" />
          </button>
        </div>
      </div>
      <table className="w-full z-0">
        <thead>
          <tr>
            <th className="text-red-400">S</th>
            <th>M</th>
            <th>T</th>
            <th>W</th>
            <th>T</th>
            <th>F</th>
            <th className="text-red-400">S</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {calendarSets.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((day, dayIndex) => (
                <td key={day}>
                  {day.length ? (
                    <Link
                      href={`/entries/${dayjs(day).format("YYYY/MM/DD")}`}
                      className={`btn btn-sm ${dayjs(day).isSame(dayjs(), "day") ? "btn-primary" : "btn-ghost"} ${
                        dayIndex === 0 || dayIndex === 6 ? "text-red-400" : null
                      }`}
                    >
                      {dayjs(day).format("D")}
                    </Link>
                  ) : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
