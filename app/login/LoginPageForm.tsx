"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useError from "../../helpers/useError";

interface ILoginUser {
  email: string;
  password: string;
}

export default function LoginPageForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { errorMessage, isError, setError } = useError(false);
  const { register, handleSubmit } = useForm<ILoginUser>();

  const onSubmit: SubmitHandler<ILoginUser> = async (data) => {
    try {
      setIsLoading(true);
      setError(false);

      const result = await signIn("credentials", {
        ...data,
        callbackUrl: "/",
      });

      if (result?.error ?? true)
        throw new Error(`Sign in failed: ${result?.error}`);
    } catch (error) {
      console.error(error);
      setError(true, error.message);
    } finally {
      setIsLoading(false);
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
            className="input mb-2 input-bordered w-full"
            disabled={isLoading}
            {...register("email")}
          />
          <label className="label" htmlFor="password">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            id="password"
            className="input mb-2 input-bordered w-full"
            disabled={isLoading}
            minLength={8}
            {...register("password")}
          />
        </div>

        <p>
          Or register account{" "}
          <Link href="/register" className="link link-primary">
            here
          </Link>
        </p>

        {isError ? (
          <div className="alert alert-error shadow-lg my-4">
            <div>
              <span>{errorMessage}</span>
            </div>
          </div>
        ) : null}

        <div className="card-actions justify-end">
          <button
            className={`btn btn-primary ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
}
