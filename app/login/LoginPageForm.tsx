"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

interface ILoginUser {
  email: string;
  password: string;
}

export default function LoginPageForm() {
  const { register, handleSubmit } = useForm<ILoginUser>();

  const onSubmit: SubmitHandler<ILoginUser> = async (data) => {
    try {
      const result = await signIn("credentials", {
        ...data,
        callbackUrl: "/",
      });

      if (result?.error ?? true)
        throw new Error(`Sign in failed: ${result?.error}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="card card-compact w-80 bg-base-200 shadow-xl"
    >
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
            {...register("email")}
          />
          <label className="label" htmlFor="password">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            id="password"
            placeholder="Type here"
            className="input mb-2 input-bordered w-full"
            {...register("password")}
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
  );
}
