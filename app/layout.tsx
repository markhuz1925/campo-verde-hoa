import {ToasterProvider} from "@/providers/toast-provider";
import {Metadata, Viewport} from "next";
import "./globals.css";
import InstallPwa from "@/components/install-pwa";

export const metadata: Metadata = {
  title: "Campo Verde Homeowners Association - Management System",
  description: "Campo Verde Homeowners Association - Management System",
  manifest: "/manifest.json",
  icons: [
    {
      url: "/logo.svg",
      href: "/logo.svg",
    },
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#1a401d",
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
        <InstallPwa />
      </body>
    </html>
  );
}
