import dayjs from "dayjs";
import { unstable_getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AppLayout from "../../../../../components/AppLayout";
import Calendar from "../../../../../components/Calendar";
import DateDivider from "../../../../../components/DateDivider";
import JournalEntryCard from "../../../../../components/JournalEntryCard";
import groupEntriesByDate from "../../../../../helpers/groupEntriesByDate";
import { getManyEntry } from "../../../../../services/entry.service";

export default async function EntriesByDayPage(props: {
  params: { year: string; month: string; day: string };
}) {
  const session = await unstable_getServerSession();

  if (!session?.user?.email) return redirect("/login");

  const today = dayjs(
    `${props.params.year}-${props.params.month}-${props.params.day}`
  );

  const entries = await getManyEntry({
    page: 1,
    limit: 30,
    userEmail: session.user.email,
    createdBefore: today.endOf("date").toDate(),
    createdAfter: today.startOf("date").toDate(),
    orderBy: "desc",
  });

  const feed = groupEntriesByDate(entries).map((item, index) => (
    <>
      <DateDivider date={item.date} />
      {item.entries.map((entry, date) => (
        <JournalEntryCard
          key={index}
          id={entry.id}
          createdAt={entry.createdAt}
          content={entry.content}
          mood={entry.mood}
        />
      ))}
    </>
  ));

  return (
    <AppLayout
      sidebar={
        <aside className="w-80 bg-base-100 text-base-content">
          <div className="p-4 grid-cols-7 gap-2">
            <Calendar
              year={Number.parseInt(props.params.year)}
              month={Number.parseInt(props.params.month) - 1}
              day={Number.parseInt(props.params.day)}
            />
          </div>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            <li>
              <a>Search</a>
            </li>
            <li>
              <a>Statistic</a>
            </li>
            <li>
              <a>About</a>
            </li>
            <li>
              <a>Account</a>
            </li>
          </ul>
        </aside>
      }
    >
      <div className="mb-24 flex flex-col p-4 gap-4">
        {feed}
        {feed.length ? null : (
          <p className="text-center">There is nothing here</p>
        )}
      </div>
    </AppLayout>
  );
}
