"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export function DashboardNavbar() {
  return (
    <nav className="fixed z-50 top-0 px-4 py-3 w-full h-fit border-b shadow-sm bg-white flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Image
          src="/logo.svg"
          alt="Campo Verde Homeowners Association"
          width={48}
          height={48}
          className="object-contain"
        />
      </div>
      <UserButton afterSignOutUrl="/sign-in" />
    </nav>
  );
}
