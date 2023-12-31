import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { date, name, type, amount } = body;

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    if (!date) return new NextResponse("Date is required", { status: 400 });
    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!type) return new NextResponse("Type is required", { status: 400 });
    if (!amount) return new NextResponse("Amount is required", { status: 400 });

    const year = new Date().getFullYear();
    const month = (new Date().getMonth() + 1).toString().padStart(2, "0");

    const transaction = await prisma.transaction.create({
      data: {
        date,
        name,
        type,
        amount,
        prefix: `${year}${month}`,
      },
    });

    return NextResponse.json(transaction);
  } catch (error) {
    console.log("[TRANSACTIONS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
