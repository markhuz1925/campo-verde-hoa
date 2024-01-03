import { getStickerChartData } from "@/app/functions/stickers";
import { VisitorDeliveryModal } from "@/components/modals/visitor-delivery-modal";
import { formatter } from "@/lib/utils";
import prisma from "@/prisma/client";
import { format } from "date-fns";
import { redirect } from "next/navigation";
import { StickerChart } from "../dashboard/_components/sticker-chart";
import { StickerColumn } from "./_components/columns";
import { StickerClient } from "./_components/sticker-client";
import { StickersHeading } from "./_components/stickersHeading";

export default async function StickerPage() {
  const stickerChartData = await getStickerChartData();
  const stickerPrices = await prisma.stickerPrice.findMany();

  const stickers = await prisma.sticker.findMany({
    orderBy: {
      createdAt: "asc",
    },
    include: {
      resident: true,
      transaction: true,
    },
  });

  const formattedStickers: StickerColumn[] = stickers.map((sticker) => ({
    id: sticker.id,
    invoice: `${sticker.transaction.prefix}${sticker.transaction.id}`,
    name: sticker.name,
    stickerColor: sticker.stickerColor,
    stickerNumber: sticker.stickerNumber,
    stickerDate: format(new Date(sticker.stickerDate), "MM/dd/yyyy"),
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
        <StickerChart data={stickerChartData} />
        <StickerClient data={formattedStickers} />
      </div>
    </div>
  );
}
