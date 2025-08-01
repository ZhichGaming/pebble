"use client";

import { logout } from "@/lib/account/actions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { UserContext } from "../store/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

export default function NavElement() {
  const location = usePathname();
  const user = useContext(UserContext);

  return (
    <nav className="fixed w-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {user ? (
            <Link
              className="p-1 cursor-pointer text-neutral-800 font-bold"
              href={"/home"}
            >
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              Home
            </Link>
          ) : (
            <Link href={"/"} className="flex items-center w-64 font-bold">
              <img src="../favicon.ico" alt="" className="h-6 mr-4" />
              <div className="text-xl text-black">Pebble</div>
            </Link>
          )}
          {location !== "/login" &&
            location !== "/signup" &&
            (user ? (
              <div className="w-64 flex items-center justify-end">
                Hey, {user.identity.username}
                <button
                  className="border-2 border-primary rounded-lg bg-primary text-neutral py-1.5 px-3 mx-2 ml-4 cursor-pointer"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div>
                <Link
                  className="border-2 border-primary rounded-lg bg-primary text-neutral py-1.5 px-3 mx-2"
                  href="/login"
                >
                  Login
                </Link>
                <Link
                  className="border-2 border-primary rounded-lg py-1.5 px-3 mx-2"
                  href="/signup"
                >
                  Sign up
                </Link>
              </div>
            ))}
        </div>
      </div>
      {/* <hr className="border-gray-300 w-screen" /> */}
    </nav>
  );
}
