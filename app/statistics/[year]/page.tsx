import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { unstable_getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import AppLayout from "../../../components/AppLayout";
import MoodNumberToEmoji from "../../../components/MoodNumberToEmoji";
import prisma from "../../../helpers/prisma";
import YearlyMoodLineChart from "./YearlyMoodLineChart";

const getEntriesCountQuery = async (year: number, email: string) =>
  await prisma.$queryRaw<{ count: bigint }[]>`
  select 
    count(e."id") 
  from 
    public."Entry" e 
    inner join public."User" u ON e."userId" = u."id" 
  where 
    to_char(e."createdAt", 'YYYY') = ${year.toString()} 
    AND u.email = ${email}
`;
const getAvgMoodPerMonthQuery = async (year: number, email: string) =>
  await prisma.$queryRaw<{ month: string; avg_mood: number | null }[]>`
  WITH avg_mood_per_month AS (
  SELECT 
    to_char(e."createdAt", 'YYYY-MM') as month, 
    AVG(mood) as avg_mood 
  FROM 
    public."Entry" e 
    inner join public."User" u on e."userId" = u.id 
  where 
    u.email = ${email} 
  GROUP BY 
    month
  ), 
  months AS (
    select 
      concat(
        ${year.toString()} || '-', 
        lpad(s :: text, 2, '0')
      ) as month 
    from 
      generate_series(1, 12) as s
  ) 
  SELECT 
    month, 
    avg_mood 
  from 
    avg_mood_per_month full 
    outer join months using (month)
`;

dayjs.extend(utc);

export default async function StatisticsByYearPage(props: {
  params: {
    year: string;
  };
}) {
  const curYear = dayjs()
    .set("year", Number.parseInt(props.params.year))
    .utcOffset(7);

  const session = await unstable_getServerSession();

  if (session?.user?.email === undefined) return redirect("/login");

  const avgMoodPerMonth = (
    await getAvgMoodPerMonthQuery(dayjs().year(), session.user.email)
  ).map((item) => item.avg_mood);
  const avgMood =
    avgMoodPerMonth.filter((a) => a).reduce((a, b) => a + b, 0) /
    avgMoodPerMonth.filter((a) => a).length;
  console.log(avgMoodPerMonth.filter((a) => a));
  const entriesCount = Number(
    (await getEntriesCountQuery(dayjs().year(), session.user.email))[0].count
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
              {entriesCount} {entriesCount > 1 ? "entries" : "entry"}
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
          moodSeries={avgMoodPerMonth}
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
