import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="p-4 pt-24 flex flex-col items-center">
      <form className="card card-compact w-80 bg-base-200 shadow-xl">
        <div className="card-body">
          <h1 className="card-title">Login</h1>
          <div className="form-control w-full">
            <label className="label" htmlFor="email">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Type here"
              className="input mb-2 input-bordered w-full"
            />
            <label className="label" htmlFor="password">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              id="password"
              placeholder="Type here"
              className="input mb-2 input-bordered w-full"
            />
          </div>
          <p>
            Or register account{" "}
            <Link href="/register" className="link link-primary">
              here
            </Link>
          </p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Login</button>
          </div>
        </div>
      </form>
    </div>
  );
}
