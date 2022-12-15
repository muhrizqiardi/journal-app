import dayjs from "dayjs";
import Link from "next/link";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const DateDivider = ({ date }: { date: string }) => (
  <p className="mt-5 first:mt-0">
    <Link
      href={`/entries/${dayjs(date).utcOffset(7).format("YYYY/MM/DD")}`}
      className="btn btn-ghost btn-sm font-bold"
    >
      {dayjs(date).utcOffset(7).format("DD MMM YYYY")}
    </Link>
  </p>
);

export default DateDivider;
