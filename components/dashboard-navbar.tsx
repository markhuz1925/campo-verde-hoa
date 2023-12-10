"use client";

import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { SettingsIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

export function DashboardNavbar() {
  const pathname = usePathname();

  const routes = [
    {
      name: "Dashboard",
      href: "/dashboard",
      active: pathname === `/dashboard`,
    },
    {
      name: "Members",
      href: "/members",
      active: pathname === `/members`,
    },
    {
      name: "Billing",
      href: "/billing",
      active: pathname === `/billing`,
    },
    {
      name: "Dues",
      href: "/dues",
      active: pathname === `/dues`,
    },
    {
      name: "Sticker",
      href: "/sticker",
      active: pathname === `/sticker`,
    },
  ];

  return (
    <nav
      className={cn(
        "fixed z-50 top-0 px-4 py-3 w-full h-fit border-b shadow-sm bg-white flex items-center justify-between",
        pathname === "/sign-in" ? "hidden opacity-0" : ""
      )}
    >
      <div className="flex items-center gap-4">
        <Image
          src="/logo.svg"
          alt="Campo Verde Homeowners Association"
          width={48}
          height={48}
          className="object-contain"
        />
        <div className="flex items-center space-x-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition hover:text-primary hover:bg-accent hover:rounded p-1",
                route.active
                  ? "text-primary rounded bg-secondary"
                  : "text-muted-foreground"
              )}
            >
              {route.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/settings">
            <SettingsIcon />
          </Link>
        </Button>
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </nav>
  );
}
