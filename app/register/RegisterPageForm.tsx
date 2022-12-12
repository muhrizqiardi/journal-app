"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { signIn } from "next-auth/react";

interface IRegisterUser {
  email: string;
  password: string;
}

export default function RegisterPageForm() {
  const { register, handleSubmit } = useForm<IRegisterUser>();
  const onSubmit: SubmitHandler<IRegisterUser> = async (data) => {
    try {
      const registerUserResult = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const signInResult = await signIn("credentials", {
        ...data,
        callbackUrl: "/",
      });

      if (signInResult?.error ?? true)
        throw new Error(`Sign in failed: ${signInResult?.error}`);
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
        <h1 className="card-title">Register</h1>
        <div className="form-control w-full">
          <label className="label" htmlFor="email">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            className="input mb-2 input-bordered w-full"
            {...register("email")}
          />
          <label className="label" htmlFor="password">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            className="input mb-2 input-bordered w-full"
            {...register("password")}
          />
          <label htmlFor="password">
            <span className="label-text">Minimum 8 characters</span>
          </label>
        </div>
        <p>
          Or log in to account{" "}
          <Link href="/register" className="link link-primary">
            here
          </Link>
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Register</button>
        </div>
      </div>
    </form>
  );
}
