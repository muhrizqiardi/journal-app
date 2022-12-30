import { Bars3Icon, HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Calendar from "./Calendar";

interface AppLayoutProps {
  children?: React.ReactNode;
  sidebar?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
}

const DefaultSidebar = () => (
  <aside className="w-80 bg-base-100 text-base-content">
    <div className="p-4 grid-cols-7 gap-2">
      <Calendar />
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

export default function AppLayout(props: AppLayoutProps) {
  const { sidebar = <DefaultSidebar />, title = "journal" } = props;

  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="navbar bg-base-100">
          <div className="flex-none">
            <label
              htmlFor="my-drawer"
              className="btn btn-square btn-ghost drawer-button lg:hidden"
            >
              <Bars3Icon className="h-5 2-5" />
            </label>
          </div>
          <div className="flex-1">
            <Link href="/" className="btn btn-ghost normal-case text-xl">
              <HomeIcon className="w-6 h-6" />
            </Link>
            <div className="flex flex-col justify-center">
              <p className="ml-4 text-lg font-semibold leading-tight">
                {title}
              </p>
              <p className="ml-4 text-xs">{props.subtitle}</p>
            </div>
          </div>
        </div>
        {props.children}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        {sidebar}
      </div>
    </div>
  );
}
