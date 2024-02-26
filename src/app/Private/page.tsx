"use client";
import { signOut } from "next-auth/react";
export default function Private() {
  return (
    <>
      <nav className="w-full bg-blue-50 px-5 py-3 ">
        <div className="text-black flex items-center justify-end gap-2">
          {"-->"}
          <button
            className="text-red-500 font-bold"
            onClick={() => {
              signOut({ redirect: true, callbackUrl: "/" });
            }}
          >
            logout
          </button>
        </div>
      </nav>
      <h1 className="text-black text-4xl text-center">
        Hello from private router
      </h1>
    </>
  );
}
