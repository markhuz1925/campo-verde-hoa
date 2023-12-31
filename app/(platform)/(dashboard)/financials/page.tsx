import {
  getExpense,
  getIncome,
  getTransactionHistory,
} from "@/app/functions/financials";
import { PageHeading } from "@/components/page-heading";
import { Separator } from "@/components/ui/separator";
import { TotalExpense } from "./_components/total-expense";
import { TotalIncome } from "./_components/total-income";
import { TransactionHistory } from "./_components/transaction-history";
import ExpenseModal from "@/components/modals/expense-modal";

export default async function FinancialsPage() {
  const transactionHistory = await getTransactionHistory();
  const incomeTransactions = await getIncome();
  const expenseTransactions = await getExpense();

  return (
    <div className="pt-20 px-5">
      <ExpenseModal />
      <PageHeading
        title="Financials"
        description="View transactions. Create expenses and purchases."
      />
      <Separator className="my-5" />
      <div className="flex flex-col lg:flex-row justify-between gap-5 mb-5">
        <TotalIncome data={incomeTransactions} />
        <TotalExpense data={expenseTransactions} />
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <TransactionHistory data={transactionHistory} />
      </div>
    </div>
  );
}
