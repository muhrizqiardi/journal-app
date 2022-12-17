import { Entry } from "@prisma/client";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { unstable_getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import AppLayout from "../../../../components/AppLayout";
import MoodNumberToEmoji from "../../../../components/MoodNumberToEmoji";
import groupEntriesByDate from "../../../../helpers/groupEntriesByDate";
import { getManyEntry } from "../../../../services/entry.service";
import MonthlyMoodLineChart from "./MonthlyMoodLineChart";

dayjs.extend(utc);

export default async function StatisticsByMonthPage(props: {
  params: {
    year: string;
    month: string;
  };
}) {
  const curMonth = dayjs()
    .set("year", Number.parseInt(props.params.year))
    .set("month", Number.parseInt(props.params.month) - 1)
    .utcOffset(7);
  const session = await unstable_getServerSession();

  if (!session?.user?.email) return redirect("/login");

  const entries: Entry[] = await getManyEntry({
    userEmail: session.user.email,
    createdBefore: curMonth.endOf("month").toDate(),
    createdAfter: curMonth.startOf("month").toDate(),
  });
  const entriesGroupedByDate = groupEntriesByDate(entries);
  const avgMoodPerDaySeries = Array(curMonth.daysInMonth())
    .fill(null)
    .map((_, index) => {
      const curIndexDate = dayjs(curMonth).set("date", index + 1);
      const entriesGroupedByDateIndex = entriesGroupedByDate.findIndex((item) =>
        curIndexDate.isSame(dayjs(item.date, "YYYY-MM-DD"), "date")
      );

      if (entriesGroupedByDateIndex > -1)
        return (
          entriesGroupedByDate[entriesGroupedByDateIndex].entries
            .map((entry) => entry.mood)
            .reduce((a, b) => a + b, 0) /
          entriesGroupedByDate[entriesGroupedByDateIndex].entries.length
        );

      return null;
    });
  const avgMood =
    avgMoodPerDaySeries.filter((a) => a).reduce((a, b) => a + b, 0) /
    avgMoodPerDaySeries.filter((a) => a).length;

  const sidebar = (
    <aside className="w-80 bg-base-100 text-base-content">
      <ul className="menu p-4 w-80 bg-base-100 text-base-content">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/search">Search</Link>
        </li>
        <li>
          <Link href="/statistics">Statistics</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/log-out">Log out</Link>
        </li>
      </ul>
    </aside>
  );

  return (
    <AppLayout title={"statistics"} sidebar={sidebar}>
      <div className="p-4 pt-0 flex flex-col gap-4">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>Statistics</li>
            <li>
              <Link href={`/statistics/${curMonth.year()}`}>
                {curMonth.year()}
              </Link>
            </li>
            <li className="font-bold">{curMonth.format("MMMM")}</li>
          </ul>
        </div>

        <div className="mx-auto flex items-center gap-4">
          <Link
            href={`/statistics/${curMonth
              .subtract(1, "month")
              .year()}/${curMonth.subtract(1, "month").format("MM")}`}
            className="btn btn-sm"
          >
            «
          </Link>
          <span className="font-bold uppercase">
            {curMonth.format("MMM YYYY")}
          </span>
          <Link
            href={`/statistics/${curMonth.add(1, "month").year()}/${curMonth
              .add(1, "month")
              .format("MM")}`}
            className="btn btn-sm"
          >
            »
          </Link>
        </div>

        <div className="stats lg:stats-horizontal stats-vertical bg-base-200 shadow">
          <div className="stat">
            <div className="stat-title">
              Total entries {curMonth.format("MMMM YYYY")}
            </div>
            <div className="stat-value">
              {entries.length} {entries.length > 1 ? "entries" : "entry"}
            </div>
          </div>
          <div className="stat">
            <div className="stat-title">Average mood</div>
            <div className="stat-value">
              {avgMood ? avgMood.toPrecision(2) : "None"}
            </div>
            {avgMood ? (
              <div className="stat-figure text-4xl lg:text-6xl">
                <MoodNumberToEmoji mood={avgMood} />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>

        <MonthlyMoodLineChart
          year={curMonth.year()}
          month={curMonth.month()}
          moodSeries={avgMoodPerDaySeries}
        />
      </div>
    </AppLayout>
  );
}
