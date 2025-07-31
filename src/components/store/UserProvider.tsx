import { getUser } from "@/lib/account/actions";
import Context from "./Context";

export default async function UserProvider(
  { children }: { children: React.ReactNode },
) {
  const user = await getUser();

  if (user == null) return children;

  return <Context user={user}>{children}</Context>;
}
