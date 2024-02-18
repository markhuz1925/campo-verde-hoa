import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {userId} = auth();
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
      stickerPenaltyChecked
    } = body;

    if (!userId) return new NextResponse("Unauthorized", {status: 401});

    const year = new Date().getFullYear();
    const month = (new Date().getMonth() + 1).toString().padStart(2, "0");

    const sticker = await prisma.sticker.create({
      data: {
        resident: {connect: {id: residentId}},
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
        transaction: {
          create: {
            date: stickerDate,
            name: stickerPenaltyChecked ? "received payment (sticker with penalty)" : "received payment (sticker)",
            type: "income",
            amount,
            prefix: `${year}${month}`,
          },
        },
      },
    });

    return NextResponse.json(sticker);
  } catch (error) {
    console.log("[PURCHASE_STICKER_POST]", error);
    return new NextResponse("Internal Error", {status: 500});
  }
}
