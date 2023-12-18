import { PageHeading } from "@/components/page-heading";
import { Separator } from "@/components/ui/separator";
import prisma from "@/prisma/client";
import PurchaseStickerForm from "../_components/purchase-sticker-form";

export default async function PurchaseSticker({
  params,
}: {
  params: { residentId: string };
}) {
  const resident = await prisma.resident.findUnique({
    where: {
      id: params.residentId,
    },
  });

  const sticker = await prisma.stickerPrice.findMany({
    where: {
      isActive: true,
    },
  });

  return (
    <div className="pt-20 px-5">
      <PageHeading title="Purchase New Sticker" description={""} />
      <div className="flex flex-col space-y-4 pt-6">
        <Separator />
        <PurchaseStickerForm resident={resident} sticker={sticker} />
      </div>
    </div>
  );
}
