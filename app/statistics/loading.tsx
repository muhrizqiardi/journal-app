import Link from "next/link";
import AppLayout from "../../components/AppLayout";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function StatisticsLoadingPage() {
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
    <AppLayout title="statistics" sidebar={sidebar}>
      <div className="p-4 pt-0 flex flex-col gap-4">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>Statistics</li>
          </ul>
        </div>

        <div className="my-24 flex justify-center">
          <LoadingSpinner />
        </div>
      </div>
    </AppLayout>
  );
}
