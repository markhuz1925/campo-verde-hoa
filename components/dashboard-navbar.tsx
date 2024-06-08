"use client";

import {Button} from '@/components/ui/button';
import {Sheet, SheetClose, SheetContent, SheetTrigger,} from '@/components/ui/sheet';
import {urbanist} from '@/lib/constants';
import {cn} from '@/lib/utils';
import {UserButton} from '@clerk/nextjs';
import {MenuIcon, SettingsIcon} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

export function DashboardNavbar() {
  const pathname = usePathname();

  const routes = [
    {
      name: "Dashboard",
      href: "/dashboard",
      active: pathname === `/dashboard`,
    },
    {
      name: "Residents",
      href: "/residents",
      active: pathname === `/residents`,
    },
    {
      name: "Financials",
      href: "/financials",
      active: pathname === `/financials`,
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
        "fixed z-50 top-0 px-4 py-3 w-full h-fit shadow-sm backdrop-blur-3xl bg-white/70 flex items-center justify-between",
        pathname === "/sign-in" || pathname === "/sign-in/factor-one"
          ? "hidden opacity-0"
          : "",
        urbanist.className
      )}
    >
      {/* mobile */}
      <div className="lg:hidden flex items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="flex items-center justify-center backdrop-blur-3xl backdrop-opacity-95 bg-white/50 w-full"
          >
            <div className="flex flex-col items-center space-y-5">
              {routes.map((route) => (
                <SheetClose key={route.href} asChild>
                  <Link
                    href={route.href}
                    className={cn(
                      "text-2xl font-medium transition hover:text-primary hover:bg-accent hover:rounded p-1",
                      route.active
                        ? "text-primary rounded bg-secondary"
                        : "text-muted-foreground"
                    )}
                  >
                    {route.name}
                  </Link>
                </SheetClose>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <Image
          src="/logo.svg"
          alt="Campo Verde Homeowners Association"
          width={48}
          height={48}
          className="object-contain"
        />
      </div>
      {/* desktop */}
      <div className="hidden lg:flex items-center gap-4">
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
