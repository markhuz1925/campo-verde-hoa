import prisma from "@/prisma/client";

export async function getPettyCash(): Promise<number> {
  const pettyCash = await prisma.pettyCash.findMany();

  const cashIn = pettyCash
    .filter((cash) => cash.type === "cashIn")
    .reduce((sum, cash) => sum + Number(cash.amount), 0);

  const cashOut = pettyCash
    .filter((cash) => cash.type === "cashOut")
    .reduce((sum, cash) => sum + Number(cash.amount), 0);

  return cashIn - cashOut;
}
