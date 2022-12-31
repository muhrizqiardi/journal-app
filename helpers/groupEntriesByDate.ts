import { Entry } from "@prisma/client";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const groupEntriesByDate = (entries: Entry[]) => {
  let dates: string[] = [];

  entries.forEach((entry) => {
    const curDate = dayjs(entry.createdAt).utcOffset(7).format("YYYY-MM-DD");
    const isInDates: boolean =
      dates.filter((date) => date === curDate).length > 0;

    if (!isInDates) dates.push(curDate);
  });

  return dates.map((date) => ({
    date,
    entries: entries.filter(
      (entry) =>
        dayjs(entry.createdAt).utcOffset(7).format("YYYY-MM-DD") === date
    ),
  }));
};

export default groupEntriesByDate;
