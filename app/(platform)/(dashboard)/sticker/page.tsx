import { PageHeading } from "@/components/page-heading";
import prisma from "@/prisma/client";
import { redirect } from "next/navigation";
import { StickerClient } from "./_components/sticker-client";
import { StickerColumn } from "./_components/columns";
import { format } from "date-fns";
import { ResidentWithOptions } from "@/types";

export default async function StickerPage() {
  const stickerPrices = await prisma.stickerPrice.findMany();

  const stickers = await prisma.sticker.findMany({
    orderBy: {
      createdAt: "asc",
    },
    include: {
      resident: true,
    },
  });

  const formattedStickers: StickerColumn[] = stickers.map((sticker) => ({
    id: sticker.id,
    name: sticker.name,
    stickerColor: sticker.stickerColor,
    stickerNumber: sticker.stickerNumber,
    stickerDate: format(new Date(sticker.stickerDate), "MMM dd, yyyy"),
    block: sticker.resident.block,
    lot: sticker.resident.lot,
  }));

  if (stickerPrices.length <= 0) redirect("/settings");

  return (
    <div className="pt-20 px-4">
      <PageHeading title="Stickers" description="Manage your stickers" />
      <div className="flex flex-col gap-5">
        <StickerClient data={formattedStickers} />
      </div>
    </div>
  );
}
