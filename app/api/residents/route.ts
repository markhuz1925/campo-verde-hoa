import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, block, lot, phase, contactNumber, email, isAdmin, role } =
      body;

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!block) return new NextResponse("Block is required", { status: 400 });
    if (!lot) return new NextResponse("Lot is required", { status: 400 });
    if (!phase) return new NextResponse("Phase is required", { status: 400 });
    if (!role) return new NextResponse("Role is required", { status: 400 });

    const existingResident = await prisma.resident.findFirst({
      where: {
        AND: [{ name, block, lot, phase }],
      },
    });

    if (existingResident) {
      return new NextResponse(
        "Resident with the same name, block, lot, and phase already exists",
        { status: 400 }
      );
    }

    const resident = await prisma.resident.create({
      data: {
        name,
        block,
        lot,
        phase,
        contactNumber,
        email,
        isAdmin,
        role,
        userId,
      },
    });

    return NextResponse.json(resident);
  } catch (error) {
    console.log("[RESIDENT_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
