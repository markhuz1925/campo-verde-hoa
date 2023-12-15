import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { residentId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, phase, block, lot, contactNumber, email, isAdmin, role } =
      body;

    console.log(params.residentId);

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    if (!name) return new NextResponse("Name is required", { status: 400 });

    const resident = await prisma.resident.update({
      where: {
        id: params.residentId,
      },
      data: {
        name,
        phase,
        block,
        lot,
        contactNumber,
        email,
        isAdmin,
        role,
      },
    });

    return NextResponse.json(resident, { status: 200 });
  } catch (error) {
    console.log("[RESIDENT_PATCH]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
