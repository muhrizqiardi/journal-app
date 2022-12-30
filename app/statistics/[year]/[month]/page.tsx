import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { unstable_getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import AppLayout from "../../../../components/AppLayout";
import MoodNumberToEmoji from "../../../../components/MoodNumberToEmoji";
import prisma from "../../../../helpers/prisma";
import MonthlyMoodLineChart from "./MonthlyMoodLineChart";

const getMonthlyEntriesCountQuery = async (
  year: number,
  month: number,
  email: string
) => {
  const yyMmString = `${year.toString()}-${month.toString().padStart(2, "0")}`;

  return await prisma.$queryRaw<{ count: bigint }[]>`
  select 
    count(e."id") 
  from 
    public."Entry" e 
    inner join public."User" u ON e."userId" = u."id" 
  where 
    to_char(e."createdAt", 'YYYY-MM') = ${yyMmString}
    AND u.email = ${email}
`;
};
const getAvgMoodPerDaySeriesQuery = async (
  year: number,
  month: number,
  email: string
) => {
  const yyMmString = `${year.toString()}-${month.toString().padStart(2, "0")}`;

  return await prisma.$queryRaw<{ date: string; avg_mood: number | null }[]>`
  with dates as (
    select 
      generate_series :: date as date 
    from 
      generate_series(
        date_trunc('month', ${`${yyMmString}-01`} :: date):: date, 
        date_trunc('month', ${`${yyMmString}-01`} :: date) + interval '1 month' - interval '1 day', 
        '1 day'
      )
  ), 
  avg_mood_per_day as (
    select 
      to_char(e."createdAt", 'YYYY-MM-DD') as date, 
      avg(e.mood) as avg_mood 
    from 
      public."Entry" e 
      inner join public."User" u ON e."userId" = u."id" 
    where 
      to_char(e."createdAt", 'YYYY-MM') = ${yyMmString} 
      AND u.email = ${email} 
    group by 
      date
  ) 
  select 
    d.date, 
    a.avg_mood 
  from 
    avg_mood_per_day a full 
    outer join dates d on a.date = d.date :: text
`;
};

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

  if (session?.user?.email === undefined) return redirect("/login");

  const avgMoodPerDay = (
    await getAvgMoodPerDaySeriesQuery(
      curMonth.year(),
      curMonth.month() + 1,
      session.user.email
    )
  ).map((item) => item.avg_mood);
  const avgMood =
    avgMoodPerDay.filter((a) => a).reduce((a, b) => a + b, 0) /
    avgMoodPerDay.filter((a) => a).length;
  const monthlyEntriesCount = Number(
    (
      await getMonthlyEntriesCountQuery(
        curMonth.year(),
        curMonth.month() + 1,
        session.user.email
      )
    )[0].count
  );

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
    <AppLayout
      title="Statistics"
      subtitle={curMonth.format("MMM YYYY")}
      sidebar={sidebar}
    >
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
              {monthlyEntriesCount}{" "}
              {monthlyEntriesCount > 1 ? "entries" : "entry"}
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
          moodSeries={avgMoodPerDay}
        />
      </div>
    </AppLayout>
  );
}
