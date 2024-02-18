import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { date, paidTo, description, amount, approvedBy, balance, type } =
      body;

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    if (!date) return new NextResponse("Date is required", { status: 400 });
    if (!paidTo)
      return new NextResponse("Paid to is required", { status: 400 });
    if (!description)
      return new NextResponse("Description is required", { status: 400 });
    if (!approvedBy)
      return new NextResponse("Approved by is required", { status: 400 });
    if (!amount) return new NextResponse("Amount is required", { status: 400 });
    if (!balance)
      return new NextResponse("Balance is required", { status: 400 });
    if (!type) return new NextResponse("Type is required", { status: 400 });

    // Check if amount is greater than balance
    if (amount > balance) {
      return new NextResponse(
        "Operation not allowed: amount is greater than balance",
        { status: 400 }
      );
    }

    const pettyCash = await prisma.pettyCash.create({
      data: {
        date,
        paidTo,
        description,
        amount,
        approvedBy,
        balance,
        type,
      },
    });

    return NextResponse.json(pettyCash);
  } catch (error) {
    console.log("[PETTY_CASH_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
