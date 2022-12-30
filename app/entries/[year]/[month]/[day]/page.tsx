import dayjs from "dayjs";
import { unstable_getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import AppLayout from "../../../../../components/AppLayout";
import Calendar from "../../../../../components/Calendar";
import EntriesGroupedByDate from "../../../../../components/EntriesGroupedByDate";
import { getManyEntry } from "../../../../../services/entry.service";

export default async function EntriesByDayPage(props: {
  params: { year: string; month: string; day: string };
  searchParams: { page?: string };
}) {
  const {
    searchParams: { page = "1" },
  } = props;

  const session = await unstable_getServerSession();

  if (!session?.user?.email) return redirect("/login");

  const today = dayjs(
    `${props.params.year}-${props.params.month}-${props.params.day}`
  ).utcOffset(7);

  const entries = await getManyEntry({
    page: Number.parseInt(page),
    limit: 30,
    userEmail: session.user.email,
    createdBefore: today.endOf("date").toDate(),
    createdAfter: today.startOf("date").toDate(),
    orderBy: "desc",
  });

  const sidebar = (
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

  const feed = <EntriesGroupedByDate entries={entries} />;

  return (
    <AppLayout
      sidebar={sidebar}
      title={`Entries at ${today.format("DD MMMM YYYY")}`}
    >
      <div className="mb-24 flex flex-col p-4 gap-4">{feed}</div>
    </AppLayout>
  );
}
