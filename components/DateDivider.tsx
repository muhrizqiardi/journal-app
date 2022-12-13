import dayjs from "dayjs";
import Link from "next/link";

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

export default DateDivider;
