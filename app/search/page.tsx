import { Entry } from "@prisma/client";
import { unstable_getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import AppLayout from "../../components/AppLayout";
import EntriesGroupedByDate from "../../components/EntriesGroupedByDate";
import { getManyEntry } from "../../services/entry.service";
import SearchBox from "./SearchBox";

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

export default async function SearchIndexPage(props: {
  searchParams: { keyword?: string };
}) {
  const session = await unstable_getServerSession();

  if (!session?.user?.email) return redirect("/login");

  let results: Entry[] = [];

  if (
    props.searchParams?.keyword !== undefined &&
    props.searchParams?.keyword.length > 0
  )
    results = await getManyEntry({
      content: props.searchParams?.keyword,
      userEmail: session.user.email,
      page: 1,
      limit: 30,
      orderBy: "desc",
    });

  return (
    <AppLayout title="search" sidebar={sidebar}>
      <div className="mb-24 flex flex-col p-4 gap-4">
        <SearchBox defaultValue={props.searchParams?.keyword ?? ""} />

        {props.searchParams?.keyword === undefined ||
        props.searchParams?.keyword?.length === 0 ? (
          <p className="text-center text-xs">
            Enter keyword, like &quot;hello&quot;
          </p>
        ) : null}

        {props.searchParams?.keyword?.length > 0 && results.length === 0 ? (
          <p className="text-center text-xs">Entries not found</p>
        ) : null}

        {props.searchParams?.keyword !== undefined && results.length > 0 ? (
          <EntriesGroupedByDate entries={results} />
        ) : null}
      </div>
    </AppLayout>
  );
}
