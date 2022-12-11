import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";

export default function NewEntryForm() {
  return (
    <form className="card card-compact bg-base-300 shadow">
      <div className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">New journal entry</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Enter text here..."
          ></textarea>
        </div>
        <div className="card-actions mt-2 justify-end items-end">
          <div className="dropdown dropdown-bottom dropdown-end">
            <label tabIndex={0} className="btn btn-sm">
              {"🙂"}
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>{"😁 Happiest possible"}</a>
              </li>
              <li>
                <a>{"🙂 Happy"}</a>
              </li>
              <li>
                <a>{"🙁 Sad"}</a>
              </li>
              <li>
                <a>{"😞 Saddest possible"}</a>
              </li>
            </ul>
          </div>
          <button type="submit" className="btn btn-sm">
            <PaperAirplaneIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </form>
  );
}