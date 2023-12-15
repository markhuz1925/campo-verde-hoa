import prisma from "@/prisma/client";
import { ResidentForm } from "./_components/resident-form";
import { Resident } from "@prisma/client";
import { ResidentWithOptions } from "@/types";
import { PurchaseStickerModal } from "@/components/modals/purchase-sticker-modal";

export default async function ResidentPage({
  params,
}: {
  params: { residentId: string };
}) {
  const resident: ResidentWithOptions | null = await prisma.resident.findUnique(
    {
      where: {
        id: params.residentId,
      },
      include: {
        stickers: true,
        dues: true,
      },
    }
  );

  return (
    <div className="flex flex-col pt-20 px-5">
      <PurchaseStickerModal />
      <ResidentForm resident={resident} />
    </div>
  );
}
