"use client";

import { signup } from "@/lib/account/actions";
import Link from "next/link";
import React, { useActionState } from "react";

export default function SignupPage() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#E4E4DE]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Sign Up
        </h2>
        <form className="space-y-4" action={action}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-4 py-2 mt-1 border rounded-md"
              placeholder="Enter your Username"
            />
            {state?.errors?.username && <p>{state.errors.username}</p>}
          </div>
          <div>
            <label
              htmlFor="firstname"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              className="w-full px-4 py-2 mt-1 border rounded-md"
              placeholder="Enter your firstname"
            />
            {state?.errors?.firstname && <p>{state.errors.firstname}</p>}
          </div>
          <div>
            <label
              htmlFor="lastname"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              className="w-full px-4 py-2 mt-1 border rounded-md"
              placeholder="Enter your lastname"
            />
            {state?.errors?.lastname && <p>{state.errors.lastname}</p>}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 mt-1 border rounded-md"
              placeholder="Enter your email"
            />
            {state?.errors?.email && <p>{state.errors.email}</p>}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 mt-1 border rounded-md"
              placeholder="Enter your password"
            />
          </div>
          {state?.errors?.password && (
            <div>
              <p>Password must:</p>
              <ul>
                {state.errors.password.map((error) => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-[#595F39] rounded-md cursor-pointer"
            disabled={pending}
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-[#595F39] hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

