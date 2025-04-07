"use client";

import { login } from "@/lib/account/actions";
import Link from "next/link";
import { useActionState } from "react";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#E4E4DE]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form className="space-y-4" action={action}>
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
              defaultValue={(state?.payload?.get("email") || "") as string}
              className="w-full px-4 py-2 mt-1 border rounded-md"
              placeholder="Enter your email"
              required
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
              required
            />
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
          </div>
          <button
            type="submit"
            disabled={pending}
            className="w-full px-4 py-2 text-white bg-[#595F39] rounded-md cursor-pointer"
          >
            Sign In
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-[#595F39] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

