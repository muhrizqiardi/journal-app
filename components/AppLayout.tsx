import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Calendar from "./Calendar";

interface AppLayoutProps {
  children?: React.ReactNode;
}

export default function AppLayout(props: AppLayoutProps) {
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
              journal
            </Link>
          </div>
        </div>
          {props.children}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <aside className="w-80 bg-base-100 text-base-content">
          <div className="p-4 grid-cols-7 gap-2">
            <Calendar />
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
      </div>
    </div>
  );
}
