import {
  getGreenCount,
  getGreenSales,
  getRedCount,
  getRedSales,
  getSilverCount,
  getSilverSales,
  getStickerCount,
  getStickerSales,
  getWhiteCount,
  getWhiteSales,
  getYellowCount,
  getYellowSales,
} from "@/app/functions/stickers";
import { StickerCount } from "./_components/sticker-count";
import { StickerGreen } from "./_components/sticker-green";
import { StickerRed } from "./_components/sticker-red";
import { StickerSilver } from "./_components/sticker-silver";
import { StickerWhite } from "./_components/sticker-white";
import { StickerYellow } from "./_components/sticker-yellow";
import { TotalStickerSales } from "./_components/total-sticker-sales";
import { PageHeading } from "@/components/page-heading";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TotalIncome } from "../financials/_components/total-income";
import { TotalExpense } from "../financials/_components/total-expense";
import { getExpense, getHoaFunds, getIncome } from "@/app/functions/financials";
import { TotalHoaFunds } from "../financials/_components/total-hoa-funds";

export default async function DashboardPage() {
  const stickerSales = await getStickerSales();
  const stickerCount = await getStickerCount();
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

  return (
    <div className="px-5 pt-20">
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
              {/* <div className="flex flex-col lg:flex-row lg:gap-10 px-5">
                <TotalStickerSales totalStickerSales={stickerSales} />
                <StickerCount stickerCount={stickerCount} />
              </div> */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-5 bg-slate-50/80 rounded-3xl shadow-sm backdrop-blur-3xl">
                <StickerGreen
                  count={stickerGreenCount}
                  sales={stickerGreenSales}
                />
                <StickerYellow
                  count={stickerYellowCount}
                  sales={stickerYellowSales}
                />
                <StickerWhite
                  count={stickerWhiteCount}
                  sales={stickerWhiteSales}
                />
                <StickerRed count={stickerRedCount} sales={stickerRedSales} />
                <StickerSilver
                  count={stickerSilverCount}
                  sales={stickerSilverSales}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
