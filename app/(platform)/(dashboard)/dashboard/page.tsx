import {PageHeading} from '@/components/page-heading';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Separator} from '@/components/ui/separator';
import {StickerCount} from '@/components/dashboard/sticker-count';
import {StickerGreen} from '@/components/dashboard/sticker-green';
import {StickerPercentage} from '@/components/dashboard/sticker-percentage';
import {StickerRed} from '@/components/dashboard/sticker-red';
import {StickerSilver} from '@/components/dashboard/sticker-silver';
import {StickerWhite} from '@/components/dashboard/sticker-white';
import {StickerYellow} from '@/components/dashboard/sticker-yellow';
import {TotalStickerSales} from '@/components/dashboard/total-sticker-sales';
import {Suspense} from 'react';
import {getExpense, getHoaFunds, getIncome} from '@/functions/financials';
import {TotalHoaFunds} from '@/components/total-hoa-funds';
import {TotalIncome} from '@/components/total-income';
import {TotalExpense} from '@/components/total-expense';

export default async function DashboardPage() {
  const [
    incomeTransactions,
    expenseTransactions,
    totalHoaFunds,
  ] = await Promise.all([
    getIncome(),
    getExpense(),
    getHoaFunds(),
  ]);

  return (
    <div className="md:px-5 pt-20 pb-20">
      <div className="gap-10">
        <PageHeading title="Dashboard" description="" />
        <Separator className="my-5" />
        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader>
              <CardTitle className="font-thin">Financial</CardTitle>
              <TotalHoaFunds data={totalHoaFunds} />
            </CardHeader>
            <CardContent>
               {/*<TransactionChart data={transactionChartDate} /> */}
              <div className="flex flex-col lg:flex-row lg:gap-10 px-5">
                <TotalIncome data={incomeTransactions} />
                <TotalExpense data={expenseTransactions} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-thin">Sticker</CardTitle>
            </CardHeader>
            <CardContent>
              {/* <StickerChart data={stickerChartData} /> */}
              <div className="flex flex-col lg:flex-row lg:gap-10 px-5">
                <TotalStickerSales />
                <StickerCount />
                <StickerPercentage />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-5 bg-slate-50/80 rounded-3xl shadow-sm backdrop-blur-3xl">
                <Suspense fallback={<div>Loading...</div>}>
                  <StickerGreen />
                </Suspense>
                <Suspense fallback={<div>Loading...</div>}>
                  <StickerYellow />
                </Suspense>
                <Suspense fallback={<div>Loading...</div>}>
                  <StickerWhite />
                </Suspense>
                <Suspense fallback={<div>Loading...</div>}>
                  <StickerRed />
                </Suspense>
                <Suspense fallback={<div>Loading...</div>}>
                  <StickerSilver />
                </Suspense>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
