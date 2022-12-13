import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import CalendarSets from "dayjs-plugin-calendar-sets";
import Link from "next/link";

export interface CalendarProps {
  year?: number;
  month?: number;
  day?: number;
}

export default function Calendar(props: CalendarProps) {
  const {
    year = dayjs().year(),
    month = dayjs().month(),
    day = dayjs().date(),
  } = props;

  dayjs.extend(CalendarSets);
  const calendarSets = dayjs.calendarSets().month({ year, month });

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-bold">
          {dayjs(new Date(year, month, day)).format("MMM YYYY")}
        </p>
        <div className="btn-group">
          <Link
            href={`/entries/${dayjs(new Date(year, month, day))
              .subtract(1, "month")
              .startOf("M")
              .format("YYYY/MM/DD")}`}
            className="btn btn-sm"
          >
            <ChevronLeftIcon className="w-3 h-3" />
          </Link>
          <Link
            href={`/entries/${dayjs(new Date(year, month, day))
              .add(1, "month")
              .startOf("M")
              .format("YYYY/MM/DD")}`}
            className="btn btn-sm"
          >
            <ChevronRightIcon className="w-3 h-3" />
          </Link>
        </div>
      </div>
      <table className="w-full z-0">
        <thead>
          <tr>
            <th>M</th>
            <th>T</th>
            <th>W</th>
            <th>T</th>
            <th>F</th>
            <th className="text-red-300">S</th>
            <th className="text-red-300">S</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {calendarSets.map((week, weekIndex) => (
            <tr key={"week " + weekIndex.toString()}>
              {week.map((curDay, curDayIndex) => (
                <td key={curDay}>
                  {curDay.length ? (
                    <Link
                      href={`/entries/${dayjs(curDay).format("YYYY/MM/DD")}`}
                      className={`btn btn-sm btn-square ${dayjs(curDay).isSame(
                        dayjs()
                          .set("year", year)
                          .set("month", month)
                          .set("date", day),
                        "date"
                      )
                          ? ""
                          : "btn-ghost"} ${curDayIndex === 5 || curDayIndex === 6
                          ? "text-red-300"
                          : null}`}
                    >
                      {dayjs(curDay).format("D")}
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
