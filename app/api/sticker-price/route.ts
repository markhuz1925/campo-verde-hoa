import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, color, price, isActive } = body;

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!color) return new NextResponse("Color is required", { status: 400 });
    if (!price) return new NextResponse("Price is required", { status: 400 });

    const stickerPrice = await prisma.stickerPrice.create({
      data: {
        name,
        color,
        price,
        isActive,
        userId,
      },
    });

    return NextResponse.json(stickerPrice);
  } catch (error) {
    console.log("[STICKER_PRICE_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
