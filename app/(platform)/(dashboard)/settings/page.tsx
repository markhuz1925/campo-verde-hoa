import { PageHeading } from "@/components/page-heading";
import prisma from "@/prisma/client";
import { StickerSettings } from "./_components/sticker-settings";

export default async function SettingsPage() {
  const stickerPrice = await prisma.stickerPrice.findMany({
    where: {
      isActive: true,
    },
  });

  return (
    <div className="pt-20 px-4">
      <PageHeading title="Settings" description="Manage your settings" />
      <StickerSettings data={stickerPrice} />
    </div>
  );
}
