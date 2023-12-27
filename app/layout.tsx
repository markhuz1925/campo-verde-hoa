import { ToasterProvider } from "@/providers/toast-provider";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  icons: [
    {
      url: "/logo.svg",
      href: "/logo.svg",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-teal-100/20 to-amber-100/20">
        <ToasterProvider />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
