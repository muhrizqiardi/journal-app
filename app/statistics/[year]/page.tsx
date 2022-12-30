import { Entry } from "@prisma/client";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { unstable_getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import AppLayout from "../../../components/AppLayout";
import MoodNumberToEmoji from "../../../components/MoodNumberToEmoji";
import groupEntriesByDate from "../../../helpers/groupEntriesByDate";
import { getManyEntry } from "../../../services/entry.service";
import YearlyMoodLineChart from "./YearlyMoodLineChart";

dayjs.extend(utc);

function groupEntriesByMonth(entries: Entry[]) {
  let months: string[] = []; // Contains months w/ format YYYY-MM

  entries.forEach((entry) => {
    const curEntryDate = dayjs(entry.createdAt).utcOffset(7);
    const isInMonths: boolean =
      months.filter((month) =>
        dayjs(month, "YYYY-MM").utcOffset(7).isSame(curEntryDate, "month")
      ).length > 0;

    if (!isInMonths) months.push(curEntryDate.format("YYYY-MM"));
  });

  return months.map((month) => ({
    month,
    entries: entries.filter((entry) =>
      dayjs(entry.createdAt)
        .utcOffset(7)
        .isSame(dayjs(month, "YYYY-MM"), "month")
    ),
  }));
}

export default async function StatisticsByYearPage(props: {
  params: {
    year: string;
  };
}) {
  const curYear = dayjs()
    .set("year", Number.parseInt(props.params.year))
    .utcOffset(7);
  const session = await unstable_getServerSession();

  if (!session?.user?.email) return redirect("/login");

  const entries: Entry[] = await getManyEntry({
    userEmail: session.user.email,
    createdBefore: curYear.endOf("year").toDate(),
    createdAfter: curYear.startOf("year").toDate(),
  });
  const entriesGroupedByMonth = groupEntriesByMonth(entries);
  let avgMoodPerMonthSeries: (typeof NaN | null)[] = Array(12)
    .fill(null)
    .map((_, index) => {
      const curIndexMonth = dayjs(curYear).set("month", index);
      const entriesGroupedByMonthIndex = entriesGroupedByMonth.findIndex(
        (item) => curIndexMonth.isSame(dayjs(item.month, "YYYY-MM"), "month")
      );

      if (entriesGroupedByMonthIndex > -1)
        return (
          entriesGroupedByMonth[entriesGroupedByMonthIndex].entries
            .map((entry) => entry.mood)
            .reduce((a, b) => a + b, 0) /
          entriesGroupedByMonth[entriesGroupedByMonthIndex].entries.length
        );

      return null;
    });
  const avgMood =
    avgMoodPerMonthSeries.filter((a) => a).reduce((a, b) => a + b, 0) /
    avgMoodPerMonthSeries.filter((a) => a).length;

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
    <AppLayout title={"Statistics"} sidebar={sidebar}>
      <div className="p-4 pt-0 flex flex-col gap-4">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>Statistics</li>
            <li>{curYear.year()}</li>
          </ul>
        </div>

        <div className="mx-auto flex items-center gap-4">
          <Link
            href={`/statistics/${curYear.subtract(1, "year").year()}`}
            className="btn btn-sm"
          >
            «
          </Link>
          <span className="font-bold">{curYear.format("YYYY")}</span>
          <Link
            href={`/statistics/${curYear.add(1, "year").year()}`}
            className="btn btn-sm"
          >
            »
          </Link>
        </div>

        <div className="stats lg:stats-horizontal stats-vertical bg-base-200 shadow">
          <div className="stat">
            <div className="stat-title">
              Total entries in {curYear.format("YYYY")}
            </div>
            <div className="stat-value">
              {entries.length} {entries.length > 1 ? "entries" : "entry"}
            </div>
          </div>
          <div className="stat">
            <div className="stat-title">
              Average mood in {curYear.format("YYYY")}
            </div>
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

        <YearlyMoodLineChart
          year={curYear.year()}
          moodSeries={avgMoodPerMonthSeries}
        />

        <div className="mx-auto flex justify-center gap-1 flex-wrap">
          {Array(12)
            .fill(0)
            .map((_, index) => (
              <Link
                key={index}
                href={`/statistics/${curYear.year()}/${(index + 1)
                  .toString()
                  .padStart(2, "0")}`}
                className="btn btn-sm"
              >
                {curYear.set("month", index).format("MMMM")}
              </Link>
            ))}
        </div>
      </div>
    </AppLayout>
  );
}
