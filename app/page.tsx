import { Bars3Icon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import Link from "next/link";
import Calendar from "../components/Calendar";
import JournalEntryCard from "../components/JournalEntryCard";
import NewEntryForm from "../components/NewEntryForm";
import { faker } from "@faker-js/faker";
import _ from "lodash";
import AppLayout from "../components/AppLayout";

const groupEntriesByDate = (
  entries: {
    id: number;
    content: string;
    createdAt: string;
    mood: number;
  }[]
) => {
  let dates: string[] = [];

  entries.forEach((entry) => {
    const curDate = dayjs(entry.createdAt).format("YYYY-MM-DD");
    const isInDates: boolean =
      dates.filter((date) => date === curDate).length > 0;

    if (!isInDates) dates.push(curDate);
  });

  return dates.map((date) => ({
    date,
    entries: entries.filter(
      (entry) => dayjs(entry.createdAt).format("YYYY-MM-DD") === date
    ),
  }));
};

export default async function IndexPage() {
  const entries = _.orderBy(
    Array(13)
      .fill(null)
      .map((item, index) => ({
        id: index,
        content: faker.lorem.paragraphs(
          faker.datatype.number({ min: 1, max: 5 })
        ),
        createdAt: faker.date.recent(3).toISOString(),
        mood: _.sample([0.25, 0.5, 0.75, 1]) ?? 1,
      })),
    ["createdAt"],
    ["desc"]
  );
  const feed = groupEntriesByDate(entries);

  const DateDivider = ({ date }: { date: string }) => (
    <p className="mt-5 first:mt-0">
      <Link
        href={`/entries/${dayjs(date).format("YYYY/MM/DD")}`}
        className="btn btn-ghost btn-sm font-bold"
      >
        {dayjs(date).format("DD MMM YYYY")}
      </Link>
    </p>
  );

  return (
    <AppLayout>
      <div className="mb-24 flex flex-col p-4 gap-4">
        <NewEntryForm />
        {feed.map((item, index) => (
          <>
            <DateDivider date={item.date} />
            {item.entries.map((entry, date) => (
              <JournalEntryCard
                key={index}
                createdAt={entry.createdAt}
                content={entry.content}
                mood={entry.mood}
              />
            ))}
          </>
        ))}
      </div>
    </AppLayout>
  );
}
