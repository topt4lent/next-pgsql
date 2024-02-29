"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathName = usePathname();
  if (pathName.includes("/login")) return null;

  return (
    <>
      <nav className="w-full bg-lime-400 px-5 py-3 border-b border-stone-700 dark:bg-black">
        <div className="flex justify-between items-center">
          <div className="flex left"></div>
          <div className="flex">
            <ul className="flex">
              <li className="m-2">
                <Link href="/private/home">Home</Link>
              </li>
              <li className="m-2">
                <Link href="/login">Private</Link>
              </li>
            </ul>
          </div>

          <div className="text-black flex items-center gap-2">
            {"-->"}
            <button
              className="text-red-500 font-bold dark:text-indigo-400"
              onClick={() => {
                signOut({ redirect: true, callbackUrl: "/" });
              }}
            >
              logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
