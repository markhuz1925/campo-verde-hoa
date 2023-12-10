import { bitter } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function ClerkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto h-full flex flex-col items-center justify-center gap-10">
      <div className="flex flex-col items-center justify-center gap-5">
        <Image
          src="/logo.svg"
          alt="Campo Verde Homeowners Association"
          width={200}
          height={200}
        />
        <h1 className={cn("text-3xl font-bold", bitter.className)}>
          HOA Management System
        </h1>
      </div>
      {children}
    </div>
  );
}
