import { Entry } from "@prisma/client";
import groupEntriesByDate from "../helpers/groupEntriesByDate";
import DateDivider from "./DateDivider";
import JournalEntryCard from "./JournalEntryCard";

export default function EntriesGroupedByDate(props: { entries: Entry[] }) {
  return (
    <>
      {groupEntriesByDate(props.entries).map((item, index) => (
        <>
          <DateDivider date={item.date} />
          {item.entries.map((entry) => (
            <JournalEntryCard
              key={index}
              id={entry.id}
              createdAt={entry.createdAt}
              content={entry.content}
              mood={entry.mood}
            />
          ))}
        </>
      ))}
    </>
  );
}
