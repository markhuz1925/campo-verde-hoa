import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { title } = body;

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    if (!title) return new NextResponse("Title is required", { status: 400 });

    const log = await prisma.log.create({
      data: {
        title,
        userId,
      },
    });

    return NextResponse.json(log);
  } catch (error) {
    console.log("[LOGS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
