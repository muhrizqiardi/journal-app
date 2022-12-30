import Link from "next/link";
import AppLayout from "../../components/AppLayout";

export default function SearchLoadingPage() {
  return (
    <AppLayout
      title="Search"
      sidebar={
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
      }
    >
      <div className="mb-24 flex flex-col p-4 gap-4">
        <div className="form-control w-full">
          <div className="input-group">
            <div className="input input-bordered w-full" />
            <div className="rounded-md w-8 bg-black bg-opacity-20 p-4">
              <div className="h-6 w-6"></div>
            </div>
          </div>
        </div>

        <div className="animate-pulse">
          <div className="mt-5 mb-3 w-28">
            <div className="rounded-md bg-black bg-opacity-10 p-4"></div>
          </div>
          <div className="rounded-2xl p-4 mb-3 bg-black bg-opacity-10">
            <div>
              <div className="h-4 mb-2 bg-black bg-opacity-20 rounded"></div>
              <div className="h-4 mb-2 bg-black bg-opacity-20 rounded"></div>
              <div className="h-4 mb-2 bg-black bg-opacity-20 rounded"></div>
              <div className="h-4 w-2/3 mb-2 bg-black bg-opacity-20 rounded"></div>
            </div>
            <div className="mt-2 flex justify-end items-end">
              <div className="h-4 w-24 mb-1 bg-black bg-opacity-20 rounded"></div>
              <div className="ml-auto mr-3 rounded-md bg-black bg-opacity-20 p-4"></div>
              <div className="rounded-md bg-black bg-opacity-20 p-4"></div>
            </div>
          </div>
          <div className="rounded-2xl p-4 mb-3 bg-black bg-opacity-10">
            <div>
              <div className="h-4 mb-2 bg-black bg-opacity-20 rounded"></div>
              <div className="h-4 mb-2 bg-black bg-opacity-20 rounded"></div>
              <div className="h-4 mb-2 bg-black bg-opacity-20 rounded"></div>
              <div className="h-4 w-2/3 mb-2 bg-black bg-opacity-20 rounded"></div>
            </div>
            <div className="mt-2 flex justify-end items-end">
              <div className="h-4 w-24 mb-1 bg-black bg-opacity-20 rounded"></div>
              <div className="ml-auto mr-3 rounded-md bg-black bg-opacity-20 p-4"></div>
              <div className="rounded-md bg-black bg-opacity-20 p-4"></div>
            </div>
          </div>
          <div className="rounded-2xl p-4 mb-3 bg-black bg-opacity-10">
            <div>
              <div className="h-4 mb-2 bg-black bg-opacity-20 rounded"></div>
              <div className="h-4 mb-2 bg-black bg-opacity-20 rounded"></div>
              <div className="h-4 mb-2 bg-black bg-opacity-20 rounded"></div>
              <div className="h-4 w-2/3 mb-2 bg-black bg-opacity-20 rounded"></div>
            </div>
            <div className="mt-2 flex justify-end items-end">
              <div className="h-4 w-24 mb-1 bg-black bg-opacity-20 rounded"></div>
              <div className="ml-auto mr-3 rounded-md bg-black bg-opacity-20 p-4"></div>
              <div className="rounded-md bg-black bg-opacity-20 p-4"></div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
