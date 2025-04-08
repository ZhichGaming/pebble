"use client";

import { logout } from "@/lib/account/actions";
import { ClientUser } from "@/lib/mongodb/schema";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavElement({ user }: { user: ClientUser }) {
  const location = usePathname();

  return (
    <nav className="sticky w-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img src="../favicon.ico" alt="" className="h-6 mr-4" />
            <div className="text-xl font-bold text-primary">Pebble</div>
          </div>
          {location !== "/login" &&
            location !== "/signup" &&
            (user ? (
              <div>
                <button
                  className="border-2 border-primary rounded-lg bg-primary text-neutral py-1.5 px-3 mx-2 cursor-pointer"
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
    </nav>
  );
}

