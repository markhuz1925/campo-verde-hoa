import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const {
      accountNumber,
      firstName,
      lastName,
      block,
      lot,
      phase,
      contactNumber,
      email,
      isAdmin,
      role,
    } = body;

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    if (!accountNumber)
      return new NextResponse("Name is required", { status: 400 });
    if (!firstName)
      return new NextResponse("Name is required", { status: 400 });
    if (!lastName) return new NextResponse("Name is required", { status: 400 });
    if (!block) return new NextResponse("Name is required", { status: 400 });
    if (!lot) return new NextResponse("Name is required", { status: 400 });
    if (!phase) return new NextResponse("Name is required", { status: 400 });
    if (!contactNumber)
      return new NextResponse("Name is required", { status: 400 });

    const member = await prisma.hoa.create({
      data: {
        accountNumber,
        firstName,
        lastName,
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

    return NextResponse.json(member);
  } catch (error) {
    console.log("[MEMBERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
