"use client";

import { useEffect } from "react";
import { getTodos, login, signup } from "@/lib/login/login";

export default function LoginPage() {
  useEffect(() => {
    getTodos();
  });

  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button>
    </form>
  );
}

