"use client";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Link from "next/link";
import AppLayout from "../../components/AppLayout";
import { faker } from "@faker-js/faker";
import { Entry } from "@prisma/client";
import MoodLineChart from "./MoodLineChart";
import groupEntriesByDate from "../../helpers/groupEntriesByDate";
import { getManyEntry } from "../../services/entry.service";

dayjs.extend(utc);

export default async function StatisticsPage() {
  // const entries: Entry[] = Array(120)
  //   .fill(null)
  //   .map((_, index) => ({
  //     id: index,
  //     userId: 1,
  //     mood: faker.datatype.float({ min: 0.25, max: 1, precision: 0.1 }),
  //     content: faker.lorem.sentences(3),
  //     createdAt: faker.date.recent(31),
  //     updatedAt: faker.date.recent(31),
  //   }));
  const entries: Entry[] = await getManyEntry({
    limit: 31,
  })
  const entriesGroupedByDate = groupEntriesByDate(entries);
  const avgMoodPerDaySeries = entriesGroupedByDate.map((item, index) => {
    return (
      item.entries.map((entry) => entry.mood).reduce((a, b) => a + b) /
      item.entries.length
    );
  });
  const avgMood =
    avgMoodPerDaySeries.reduce((a, b) => a + b) / entries.length;

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
            <li className="font-bold">Statistics</li>
          </ul>
        </div>
        <div className="stats stats-vertical bg-base-200 shadow">
          <div className="stat">
          <div className="stat-title">Total entries this month</div>
            <div className="stat-value">337 entries</div>
            <div className="stat-desc">21% more than last month</div>
          </div>
          <div className="stat">
            <div className="stat-title">Average mood</div>
            <div className="stat-value">{avgMood.toPrecision(2)}</div>
            <div className="stat-figure text-6xl">😁</div>
            <div className="stat-desc">21% more than last month</div>
          </div>
        </div>

        <MoodLineChart moodSeries={avgMoodPerDaySeries} />
      </div>
    </AppLayout>
  );
}
