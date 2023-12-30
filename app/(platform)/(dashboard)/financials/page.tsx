import { PageHeading } from "@/components/page-heading";
import { TotalIncome } from "./_components/total-income";
import { TotalExpense } from "./_components/total-expense";
import { Separator } from "@/components/ui/separator";
import { TransactionHistory } from "./_components/transaction-history";

export default function FinancialsPage() {
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
      <TransactionHistory />
    </div>
  );
}
