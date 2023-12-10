import prisma from "@/prisma/client";

export default async function StickerPage() {
  const stickers = await prisma.sticker.findMany();

  return <div className="pt-20 px-4"></div>;
}
