import { PageHeading } from "@/components/page-heading";
import prisma from "@/prisma/client";
import { redirect } from "next/navigation";

export default async function StickerPage() {
  const stickerPrices = await prisma.stickerPrice.findMany();

  if (stickerPrices.length <= 0) redirect("/settings");

  return (
    <div className="pt-20 px-4">
      <PageHeading title="Stickers" description="Manage your stickers" />
    </div>
  );
}
