import "@/components/globals.css";
import { getUser } from "@/lib/account/actions";
import NavElement from "./NavElement";

export default async function NavigationBar() {
  const user = JSON.parse(await getUser());

  return <NavElement user={user} />;
}

