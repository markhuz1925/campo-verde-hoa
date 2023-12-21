import { PageHeading } from "@/components/page-heading";
import prisma from "@/prisma/client";
import { redirect } from "next/navigation";
import { StickerClient } from "./_components/sticker-client";
import { StickerColumn } from "./_components/columns";
import { format } from "date-fns";
import { ResidentWithOptions } from "@/types";
import { StickersHeading } from "./_components/stickersHeading";
import { VisitorDeliveryModal } from "@/components/modals/visitor-delivery-modal";
import { formatter } from "@/lib/utils";

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
    stickerDate: new Date(sticker.stickerDate).toLocaleDateString(),
    block: sticker.resident.block,
    lot: sticker.resident.lot,
    phase: sticker.resident.phase,
    amount: formatter.format(Number(sticker.amount)), // sticker.amount,
  }));

  if (stickerPrices.length <= 0) redirect("/settings");

  return (
    <div className="pt-20 px-4">
      <StickersHeading />
      <VisitorDeliveryModal sticker={stickerPrices} />
      <div className="flex flex-col gap-5 py-4">
        <StickerClient data={formattedStickers} />
      </div>
    </div>
  );
}
