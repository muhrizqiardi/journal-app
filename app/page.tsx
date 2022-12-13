import { unstable_getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AppLayout from "../components/AppLayout";
import DateDivider from "../components/DateDivider";
import JournalEntryCard from "../components/JournalEntryCard";
import NewEntryForm from "../components/NewEntryForm";
import groupEntriesByDate from "../helpers/groupEntriesByDate";
import { getManyEntry } from "../services/entry.service";

export default async function IndexPage() {
  const session = await unstable_getServerSession();

  if (!session?.user?.email) return redirect("/login");

  const entries = await getManyEntry({
    page: 1,
    limit: 30,
    userEmail: session.user.email,
    orderBy: "desc",
  });

  const feed = groupEntriesByDate(entries).map((item, index) => (
    <>
      <DateDivider key={index} date={item.date} />
      {item.entries.map((entry, date) => (
        <JournalEntryCard
          key={entry.id}
          id={entry.id}
          createdAt={entry.createdAt.toISOString()}
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
