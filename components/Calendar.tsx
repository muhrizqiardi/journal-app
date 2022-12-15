import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import CalendarSets from "dayjs-plugin-calendar-sets";
import Link from "next/link";

dayjs.extend(utc);
dayjs.extend(CalendarSets);

export interface CalendarProps {
  year?: number;
  month?: number;
  day?: number;
}

export default function Calendar(props: CalendarProps) {
  const {
    year = dayjs().utcOffset(7).year(),
    month = dayjs().utcOffset(7).month(),
    day = dayjs().utcOffset(7).date(),
  } = props;

  const curDate = dayjs(new Date(year, month, day)).utcOffset(7);
  const calendarSets = dayjs.calendarSets().month({ year, month });

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-bold">{curDate.format("MMM YYYY")}</p>
        <div className="btn-group">
          <Link
            href={`/entries/${curDate
              .subtract(1, "month")
              .startOf("M")
              .format("YYYY/MM/DD")}`}
            className="btn btn-sm"
          >
            <ChevronLeftIcon className="w-3 h-3" />
          </Link>
          <Link
            href={`/entries/${curDate
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
              {week.map((curIterationDateString, curIterationDateIndex) => {
                const curIterationDate = dayjs(
                  curIterationDateString,
                  "YYYY-MM-DD"
                ).utcOffset(7);
                const isSameDay = curIterationDate.isSame(curDate, "date");

                return (
                  <td key={curIterationDateString}>
                    {curIterationDateString.length ? (
                      <Link
                        href={`/entries/${curIterationDate.format(
                          "YYYY/MM/DD"
                        )}`}
                        className={`btn btn-sm btn-square ${
                          isSameDay ? "" : "btn-ghost"
                        } ${
                          curIterationDateIndex === 5 ||
                          curIterationDateIndex === 6
                            ? "text-red-300"
                            : null
                        }`}
                      >
                        {curIterationDate.format("D")}
                      </Link>
                    ) : null}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
