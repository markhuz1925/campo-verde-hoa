import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const {
      residentId,
      role,
      name,
      driverLicense,
      stickerNumber,
      stickerColor,
      stickerDate,
      quantity,
      amount,
      plate,
      vehicleType,
      vehicleColor,
    } = body;

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const sticker = await prisma.sticker.create({
      data: {
        residentId,
        role,
        name,
        driverLicense,
        stickerDate,
        stickerNumber,
        stickerColor,
        quantity,
        amount,
        plate,
        vehicleType,
        vehicleColor,
        userId,
      },
    });

    return NextResponse.json(sticker);
  } catch (error) {
    console.log("[PURCHASE_STICKER_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
