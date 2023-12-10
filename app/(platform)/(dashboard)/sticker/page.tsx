import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function StickerPage() {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const stickers = await prisma.sticker.findMany();

  return <div className="pt-20 px-4"></div>;
}
