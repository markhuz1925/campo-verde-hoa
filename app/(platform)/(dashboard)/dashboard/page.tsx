import {getExpense, getHoaFunds, getIncome, getTransactionChartData,} from "@/app/functions/financials";
import {getStickerChartData} from "@/app/functions/stickers";
import {PageHeading} from "@/components/page-heading";
import {TotalExpense} from "@/components/total-expense";
import {TotalHoaFunds} from "@/components/total-hoa-funds";
import {TotalIncome} from "@/components/total-income";
import {TransactionChart} from "@/components/transaction-chart";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {StickerChart} from "./_components/sticker-chart";
import {StickerCount} from "./_components/sticker-count";
import {StickerGreen} from "./_components/sticker-green";
import {StickerPercentage} from "./_components/sticker-percentage";
import {StickerRed} from "./_components/sticker-red";
import {StickerSilver} from "./_components/sticker-silver";
import {StickerWhite} from "./_components/sticker-white";
import {StickerYellow} from "./_components/sticker-yellow";
import {TotalStickerSales} from "./_components/total-sticker-sales";
import {Suspense} from "react";

export default async function DashboardPage() {
  const [incomeTransactions, expenseTransactions, totalHoaFunds, stickerChartData, transactionChartDate] = await Promise.all([
    getIncome(),
    getExpense(),
    getHoaFunds(),
    getStickerChartData(),
    getTransactionChartData()
  ]);

  return (
    <div className="md:px-5 pt-20 pb-20">
      <div className="gap-10">
        <PageHeading title="Dashboard" description="" />
        <Separator className="my-5" />
        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader>
              <CardTitle className="font-thin">Financials</CardTitle>
              <Suspense fallback={<div>Loading...</div>} >
                <TotalHoaFunds data={totalHoaFunds} />
              </Suspense>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading...</div>} >
                <TransactionChart data={transactionChartDate} />
                <div className="flex flex-col lg:flex-row lg:gap-10 px-5">
                  <TotalIncome data={incomeTransactions} />
                  <TotalExpense data={expenseTransactions} />
                </div>
              </Suspense>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-thin">Sticker</CardTitle>
            </CardHeader>
            <CardContent>
              <StickerChart data={stickerChartData} />
              <div className="flex flex-col lg:flex-row lg:gap-10 px-5">
                <Suspense fallback={<div>Loading...</div>} >
                  <TotalStickerSales />
                  <StickerCount />
                  <StickerPercentage />
                </Suspense>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-5 bg-slate-50/80 rounded-3xl shadow-sm backdrop-blur-3xl">
                <Suspense fallback={<div>Loading...</div>} ><StickerGreen /></Suspense>
                <Suspense fallback={<div>Loading...</div>} ><StickerYellow /></Suspense>
                <Suspense fallback={<div>Loading...</div>} ><StickerWhite /></Suspense>
                <Suspense fallback={<div>Loading...</div>} ><StickerRed /></Suspense>
                <Suspense fallback={<div>Loading...</div>} ><StickerSilver /></Suspense>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
