import {
  getExpense,
  getHoaFunds,
  getIncome,
  getTransactionChartData,
  getTransactionHistory,
} from "@/app/functions/financials";
import { TotalExpense } from "@/components/total-expense";
import { TotalHoaFunds } from "@/components/total-hoa-funds";
import { TotalIncome } from "@/components/total-income";
import { TransactionChart } from "@/components/transaction-chart";
import { Separator } from "@/components/ui/separator";
import { FinancialsHeading } from "./_components/financials-heading";
import { TransactionHistory } from "./_components/transaction-history";

export default async function FinancialsPage() {
  const transactionHistory = await getTransactionHistory();
  const incomeTransactions = await getIncome();
  const expenseTransactions = await getExpense();
  const totalHoaFunds = await getHoaFunds();
  const transactionChartDate = await getTransactionChartData();

  return (
    <div className="pt-20 px-5 pb-5">
      <FinancialsHeading />
      <Separator className="my-5" />
      <TotalHoaFunds data={totalHoaFunds} />
      <TransactionChart data={transactionChartDate} />
      <div className="flex flex-col lg:flex-row justify-between gap-5 mb-5 mt-5">
        <TotalIncome data={incomeTransactions} />
        <TotalExpense data={expenseTransactions} />
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <TransactionHistory data={transactionHistory} />
      </div>
    </div>
  );
}
