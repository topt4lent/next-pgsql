"use client";
import { signOut } from "next-auth/react";
export default function Home() {
  return (
    <>
      <h1 className="text-black text-4xl text-center dark:text-stone-400">
        Hello Home
      </h1>
    </>
  );
}
