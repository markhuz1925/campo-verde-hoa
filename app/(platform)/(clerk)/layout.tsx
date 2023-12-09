import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  icons: [
    {
      url: "/logo.svg",
      href: "/logo.svg",
    },
  ],
};

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
      </div>
      {children}
    </div>
  );
}
