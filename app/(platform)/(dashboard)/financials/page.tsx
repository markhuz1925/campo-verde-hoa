import { PageHeading } from "@/components/page-heading";
import { TotalIncome } from "./_components/total-income";
import { TotalExpense } from "./_components/total-expense";
import { Separator } from "@/components/ui/separator";
import { TransactionHistory } from "./_components/transaction-history";
import prisma from "@/prisma/client";

export default async function FinancialsPage() {
  const transactionHistory = await prisma.transaction.findMany({
    include: {
      sticker: true,
    },
  });

  console.log(transactionHistory);

  return (
    <div className="pt-20 px-5">
      <PageHeading
        title="Financials"
        description="View transactions. Create expenses and purchases."
      />
      <Separator className="my-5" />
      <div className="flex flex-col lg:flex-row justify-between gap-5 mb-5">
        <TotalIncome />
        <TotalExpense />
      </div>
      <TransactionHistory data={transactionHistory} />
    </div>
  );
}
