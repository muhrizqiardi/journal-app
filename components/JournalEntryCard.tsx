"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import { useState } from "react";
import MultilineToParagraphs from "./MultilineToParagraphs";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

export interface JournalEntryCardProps {
  id: number;
  content: string;
  mood: number;
  createdAt: string | Date;
  onDelete?: (entryId: number) => void;
}

const MoodNumberToEmoji = ({ mood }: { mood: number }) => {
  if (mood === 1) return <>😁</>;
  if (mood === 0.75) return <>🙂</>;
  if (mood === 0.5) return <>🙁</>;
  if (mood === 0.25) return <>😞</>;
  return <>-</>;
};

export default function JournalEntryCard(props: JournalEntryCardProps) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDeleteEntry = async (entryId: number) => {
    try {
      setIsLoading(true);

      await fetch(`/api/entries/${entryId}`, {
        method: "DELETE",
      });

      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      console.error();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <article
        className={`card card-compact bg-base-300 shadow ${
          isLoading ? "opacity-60" : ""
        }`}
      >
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
            <button
              onClick={() => setDialogIsOpen((x) => !x)}
              className={`btn btn-sm ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </article>

      <input
        type="checkbox"
        id="confirmationDialog"
        className="modal-toggle"
        defaultChecked={false}
        checked={dialogIsOpen}
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm deletion</h3>
          <p className="py-4">Are you sure you want to delete this entry?</p>
          <div className="modal-action">
            <button
              onClick={() => {
                handleDeleteEntry(props.id);
                setDialogIsOpen((x) => !x);
              }}
              className="btn btn-error"
            >
              Yes, delete this entry
            </button>
            <button
              onClick={() => setDialogIsOpen((x) => !x)}
              className="btn btn-success"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
