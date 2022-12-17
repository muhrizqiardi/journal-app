import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBox(props: { defaultValue: string }) {
  return (
    <form className="form-control w-full">
      <div className="input-group">
        <input
          type="search"
          className="input input-bordered w-full"
          name="keyword"
          {...props}
        />
        <button className="btn">
          <MagnifyingGlassIcon className="h-6 w-6" />
        </button>
      </div>
    </form>
  );
}
