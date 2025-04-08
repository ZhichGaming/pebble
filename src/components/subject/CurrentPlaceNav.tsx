"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CurrentPlaceNav() {
  const path = usePathname().split("/");
  path.splice(0, 1);

  return (
    <nav className="flex flex-row px-[5%] py-[5%] gap-2 text-neutral-500 cursor-default">
      <Link
        href="/home"
        className="hover:text-neutral-300 transition-[color] duration-[250ms] cursor-pointer"
      >
        Home
      </Link>
      <div>&gt;</div>
      <div>{decodeURIComponent(path[0])}</div>
      <div>&gt;</div>
      <div>{decodeURIComponent(path[1])}</div>
    </nav>
  );
}

