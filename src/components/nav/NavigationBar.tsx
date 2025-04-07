import "@/components/globals.css";
import { getUser } from "@/lib/account/actions";
import NavElement from "./NavElement";

export default async function NavigationBar() {
  const res = await getUser();
  const user = res ? JSON.parse(res) : "";

  return <NavElement user={user} />;
}

