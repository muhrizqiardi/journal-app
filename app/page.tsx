import { Entry } from "@prisma/client";
import dayjs from "dayjs";
import { entries } from "lodash";
import { unstable_getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import AppLayout from "../components/AppLayout";
import JournalEntryCard from "../components/JournalEntryCard";
import NewEntryForm from "../components/NewEntryForm";
import { getManyEntry } from "../services/entry.service";

const groupEntriesByDate = (entries: Entry[]) => {
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

export default async function IndexPage() {
  const session = await unstable_getServerSession();

  console.log({ session });

  if (!session?.user?.email) return redirect("/login");

  const entries = await getManyEntry({
    page: 1,
    limit: 10,
    userEmail: session.user.email,
    orderBy: "desc",
  });

  const feed = groupEntriesByDate(entries).map((item, index) => (
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
  ));

  return (
    <AppLayout>
      <div className="mb-24 flex flex-col p-4 gap-4">
        <NewEntryForm />
        {feed}
      </div>
    </AppLayout>
  );
}
