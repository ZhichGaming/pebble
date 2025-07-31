"use client";

import { ClientUser, User } from "@/lib/mongodb/schema";
import { createContext, useState } from "react";

export const UserContext = createContext<ClientUser | null>(null);

export default function Context({
  children,
  user,
}: {
  children: React.ReactNode;
  user: ClientUser;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
