import {PageHeading} from '@/components/page-heading';
import {Separator} from '@/components/ui/separator';

export default async function FinancialsPage() {
  // const transactionHistory = await getTransactionHistory();
  // const incomeTransactions = await getIncome();
  // const expenseTransactions = await getExpense();
  // const totalHoaFunds = await getHoaFunds();
  // const transactionChartDate = await getTransactionChartData();

  return (
    <div className="pt-20 px-5 pb-5">
      <PageHeading
        title="Financials"
        description="View transactions. Create income and expense."
      />
      <Separator className="my-5" />
      {/*<TotalHoaFunds data={totalHoaFunds} />*/}
      {/*<TransactionChart data={transactionChartDate} />*/}
      <div className="flex flex-col lg:flex-row justify-between gap-5 mb-5 mt-5">
        {/*<TotalIncome data={incomeTransactions} />*/}
        {/*<TotalExpense data={expenseTransactions} />*/}
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        {/*<TransactionHistory data={transactionHistory} />*/}
      </div>
    </div>
  );
}
