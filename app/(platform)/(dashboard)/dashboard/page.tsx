import {
  getExpense,
  getHoaFunds,
  getIncome,
  getTransactionChartData,
} from "@/app/functions/financials";
import {
  getGreenCount,
  getGreenPercentage,
  getGreenSales,
  getRedCount,
  getRedPercentage,
  getRedSales,
  getSilverCount,
  getSilverPercentage,
  getSilverSales,
  getStickerChartData,
  getStickerCount,
  getStickerPercentage,
  getStickerSales,
  getWhiteCount,
  getWhitePercentage,
  getWhiteSales,
  getYellowCount,
  getYellowPercentage,
  getYellowSales,
} from "@/app/functions/stickers";
import { PageHeading } from "@/components/page-heading";
import { TotalExpense } from "@/components/total-expense";
import { TotalHoaFunds } from "@/components/total-hoa-funds";
import { TotalIncome } from "@/components/total-income";
import TransactionChart from "@/components/transaction-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import StickerChart from "./_components/sticker-chart";
import { StickerCount } from "./_components/sticker-count";
import { StickerGreen } from "./_components/sticker-green";
import { StickerPercentage } from "./_components/sticker-percentage";
import { StickerRed } from "./_components/sticker-red";
import { StickerSilver } from "./_components/sticker-silver";
import { StickerWhite } from "./_components/sticker-white";
import { StickerYellow } from "./_components/sticker-yellow";
import { TotalStickerSales } from "./_components/total-sticker-sales";

export default async function DashboardPage() {
  const stickerSales = await getStickerSales();
  const stickerCount = await getStickerCount();
  const stickerPercentage = await getStickerPercentage();
  const stickerGreenCount = await getGreenCount();
  const stickerGreenSales = await getGreenSales();
  const stickerYellowCount = await getYellowCount();
  const stickerYellowSales = await getYellowSales();
  const stickerWhiteCount = await getWhiteCount();
  const stickerWhiteSales = await getWhiteSales();
  const stickerRedCount = await getRedCount();
  const stickerRedSales = await getRedSales();
  const stickerSilverCount = await getSilverCount();
  const stickerSilverSales = await getSilverSales();
  const incomeTransactions = await getIncome();
  const expenseTransactions = await getExpense();
  const totalHoaFunds = await getHoaFunds();
  const silverPercentage = await getSilverPercentage();
  const redPercentage = await getRedPercentage();
  const greenPercentage = await getGreenPercentage();
  const yellowPercentage = await getYellowPercentage();
  const whitePercentage = await getWhitePercentage();
  const stickerChartData = await getStickerChartData();
  const transactionChartDate = await getTransactionChartData();

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
              <TransactionChart data={transactionChartDate} />
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
              <StickerChart data={stickerChartData} />
              <div className="flex flex-col lg:flex-row lg:gap-10 px-5">
                <TotalStickerSales totalStickerSales={stickerSales} />
                <StickerCount stickerCount={stickerCount} />
                <StickerPercentage percentage={stickerPercentage} />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-5 bg-slate-50/80 rounded-3xl shadow-sm backdrop-blur-3xl">
                <StickerGreen
                  count={stickerGreenCount}
                  sales={stickerGreenSales}
                  percentage={greenPercentage}
                />
                <StickerYellow
                  count={stickerYellowCount}
                  sales={stickerYellowSales}
                  percentage={yellowPercentage}
                />
                <StickerWhite
                  count={stickerWhiteCount}
                  sales={stickerWhiteSales}
                  percentage={whitePercentage}
                />
                <StickerRed
                  count={stickerRedCount}
                  sales={stickerRedSales}
                  percentage={redPercentage}
                />
                <StickerSilver
                  count={stickerSilverCount}
                  sales={stickerSilverSales}
                  percentage={silverPercentage}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
