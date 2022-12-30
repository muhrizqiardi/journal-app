"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import useError from "../../helpers/useError";

interface IRegisterUser {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPageForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isError, errorMessage, setError } = useError(false);
  const { register, handleSubmit } = useForm<IRegisterUser>();
  const onSubmit: SubmitHandler<IRegisterUser> = async (data) => {
    try {
      if (data.password !== data.confirmPassword)
        throw new Error(
          "Sign in failed: Password and Confirm Password fields should be the same"
        );

      setError(false);
      setIsLoading(true);
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
        <h1 className="card-title">Register</h1>
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

          <label className="label" htmlFor="confirmPassword">
            <span className="label-text">Confirm password</span>
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="input mb-2 input-bordered w-full"
            disabled={isLoading}
            minLength={8}
            {...register("confirmPassword")}
          />
        </div>
        <p>
          Or log in to account{" "}
          <Link href="/login" className="link link-primary">
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
            Register
          </button>
        </div>
      </div>
    </form>
  );
}
