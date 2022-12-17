"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import MoodNumberToEmoji from "./MoodNumberToEmoji";

export interface INewEntryForm {
  content: string;
}

function MoodSelector(props: {
  mood: number;
  handleChangeMood: (mood: number) => void;
}) {
  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <label tabIndex={0} className="btn btn-sm">
        <MoodNumberToEmoji mood={props.mood} />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <button
            type="button"
            onClick={() => props.handleChangeMood(1)}
            className={`${props.mood === 1 ? "font-bold" : ""}`}
          >
            {"😁 Happiest possible"}
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => props.handleChangeMood(0.75)}
            className={`${props.mood === 0.75 ? "font-bold" : ""}`}
          >
            {"🙂 Happy"}
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => props.handleChangeMood(0.25)}
            className={`${props.mood === 0.25 ? "font-bold" : ""}`}
          >
            {"🙁 Sad"}
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => props.handleChangeMood(0)}
            className={`${props.mood === 0 ? "font-bold" : ""}`}
          >
            {"😞 Saddest possible"}
          </button>
        </li>
      </ul>
    </div>
  );
}

export default function NewEntryForm() {
  const router = useRouter();
  const [mood, setMood] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { register, handleSubmit, reset } = useForm<INewEntryForm>();

  const onSubmit: SubmitHandler<INewEntryForm> = async (data) => {
    try {
      setIsLoading(true);

      const result = await fetch("/api/entries", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          mood,
        }),
      });

      reset();
      setMood(1);

      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="card card-compact bg-base-300 shadow"
    >
      <div className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">New journal entry</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Enter text here..."
            required
            disabled={isLoading}
            {...register("content")}
          ></textarea>
        </div>
        <div className="card-actions mt-2 justify-end items-end">
          {!isLoading ? (
            <MoodSelector
              mood={mood}
              handleChangeMood={(mood) => setMood(mood)}
            />
          ) : null}
          <button
            type="submit"
            className={`btn btn-sm ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            <PaperAirplaneIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </form>
  );
}
