"use client";

import { ClientUser } from "@/lib/mongodb/schema";
import { createContext } from "react";

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
