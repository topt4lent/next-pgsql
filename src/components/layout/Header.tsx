"use client";
import React from "react";
import { usePathname } from "next/navigation";
export default function Header(pageprops: any) {
  const pathName = usePathname();
  if (pathName.includes("/login")) return null;
  return <div className="text-black text-center dark:text-stone-400"></div>;
}
