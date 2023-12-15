import prisma from "@/prisma/client";

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

  const stickerName = await prisma.stickerPrice.findMany({
    select: {
      name: true,
    },
  });

  return <div className="pt-20 px-5">{params.residentId}</div>;
}
