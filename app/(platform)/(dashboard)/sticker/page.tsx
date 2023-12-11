import { StickerModal } from "@/components/modals/sticker-modal";
import prisma from "@/prisma/client";

export default async function StickerPage() {
  const stickers = await prisma.stickerPrice.findMany();

  if (stickers.length <= 0) {
    return <StickerModal />;
  }

  return <div className="pt-20 px-4"></div>;
}
