import { StickerModal } from "@/components/modals/sticker-modal";
import { PageHeading } from "@/components/page-heading";
import prisma from "@/prisma/client";

export default async function StickerPage() {
  const stickerPrices = await prisma.stickerPrice.findMany();

  if (stickerPrices.length <= 0) {
    return <StickerModal />;
  }

  return (
    <div className="pt-20 px-4">
      <PageHeading title="Stickers" description="Manage your stickers" />
      {stickerPrices.map((sticker) => (
        <div key={sticker.id}>
          <p>{sticker.name === "ho" ? "Homeowner" : sticker.name}</p>
        </div>
      ))}
    </div>
  );
}
