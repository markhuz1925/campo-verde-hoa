import {formatter} from '@/lib/utils';
import prisma from '@/prisma/client';
import {format} from 'date-fns';
import {StickerColumn} from '@/components/sticker/columns';
import {StickerClient} from '@/components/sticker/sticker-client';
import {StickersHeading} from '@/components/sticker/stickersHeading';
import {VisitorDeliveryModal} from '@/components/modals/visitor-delivery-modal';
import {redirect} from 'next/navigation';
import {getStickerChartData} from '@/functions/stickers';
import {StickerChart} from '@/components/dashboard/sticker-chart';

export default async function StickerPage() {
  const stickerChartData = await getStickerChartData();
  const stickerPrices = await prisma.stickerPrice.findMany({});

  const stickers = await prisma.sticker.findMany({
    orderBy: {
      createdAt: "asc",
    },
    include: {
      resident: true,
      transaction: true,
    },
  });

  const formattedStickers: StickerColumn[] = stickers.map((sticker: any) => ({
    id: sticker.id,
    invoice: `${sticker.transaction.prefix}${sticker.transaction.id}`,
    name: sticker.name,
    stickerColor: sticker.stickerColor,
    plate: sticker.plate,
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
