import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
} from "@heroicons/react/24/outline";
import { Entry } from "@prisma/client";
// import Link from "next/link";
import groupEntriesByDate from "../helpers/groupEntriesByDate";
import DateDivider from "./DateDivider";
import JournalEntryCard from "./JournalEntryCard";

export default function EntriesGroupedByDate(props: {
  entries: Entry[];
  currentPage?: string;
}) {
  const { currentPage = "1" } = props;
  const paginationNewest = (
    <div className="mt-4 flex justify-center">
      {/* TODO: change it to use <Link /> instead of anchor tag */}
      <a href={`?page=1`} className="btn btn-sm inline-flex items-center">
        <ChevronDoubleUpIcon className="w-4 h-4 mr-2" />
        <span>Load newest</span>
      </a>
    </div>
  );
  const paginationNext = (
    <div className="mt-4 flex justify-center">
      <a
        href={`?page=${(Number.parseInt(currentPage) + 1).toString()}`}
        className="btn btn-sm inline-flex items-center"
      >
        <ChevronDoubleDownIcon className="w-4 h-4 mr-2" />
        Load more
      </a>
    </div>
  );
  const feed = groupEntriesByDate(props.entries).map((item, index) => (
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
  ));

  if (props.entries.length === 0)
    return (
      <>
        {paginationNewest}

        <p className="my-6 text-center">There is nothing here</p>
      </>
    );

  return (
    <>
      {Number.parseInt(currentPage) > 1 ? paginationNewest : null}

      {feed}

      {paginationNext}
    </>
  );
}
