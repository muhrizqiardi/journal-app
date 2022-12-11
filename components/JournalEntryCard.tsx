import { TrashIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import MultilineToParagraphs from "./MultilineToParagraphs";

export interface JournalEntryCardProps {
  content: string;
  mood: number;
  createdAt: string;
  onDelete?: () => void;
}

const MoodNumberToEmoji = ({ mood }: { mood: number }) => {
  if (mood === 1) return <>😁</>;
  if (mood <= 0.75) return <>🙂</>;
  if (mood <= 0.5) return <>🙁</>;
  if (mood <= 0.25) return <>😞</>;
  return <>-</>;
};

export default function JournalEntryCard(props: JournalEntryCardProps) {
  return (
    <article className="card card-compact bg-base-300 shadow">
      <div className="card-body">
        <article className="prose max-w-none">
          <MultilineToParagraphs text={props.content} />
        </article>
        <div className="card-actions mt-2 justify-end items-end">
          <p className="font-bold text-sm">
            {dayjs(props.createdAt).format("HH:mm")}
          </p>
          <div className="h-8 w-8 text-lg inline-flex items-center select-none">
            <span>
              <MoodNumberToEmoji mood={props.mood} />
            </span>
          </div>
          <button className="btn btn-sm">
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
