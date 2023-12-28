import prisma from "@/prisma/client";
import { TotalStickerSales } from "./_components/total-sticker-sales";
import { StickerCount } from "./_components/sticker-count";
import { StickerCountGreen } from "./_components/sticker-count-green";
import { StickerCountYellow } from "./_components/sticker-count-yellow";
import { StickerCountWhite } from "./_components/sticker-count-white";
import { StickerCountRed } from "./_components/sticker-count-red";
import { StickerCountSilver } from "./_components/sticker-count-silver";

export default async function DashboardPage() {
  const stickerSales = await prisma.sticker.findMany();
  const stickerCount = await prisma.sticker.count();

  const stickerGreenCount = await prisma.sticker.count({
    where: {
      stickerColor: "green",
    },
  });
  const stickerGreenSales = await prisma.sticker.findMany({
    where: {
      stickerColor: "green",
    },
  });

  const stickerYellowCount = await prisma.sticker.count({
    where: {
      stickerColor: "yellow",
    },
  });
  const stickerYellowSales = await prisma.sticker.findMany({
    where: {
      stickerColor: "yellow",
    },
  });

  const stickerWhiteCount = await prisma.sticker.count({
    where: {
      stickerColor: "white",
    },
  });
  const stickerWhiteSales = await prisma.sticker.findMany({
    where: {
      stickerColor: "white",
    },
  });

  const stickerRedCount = await prisma.sticker.count({
    where: {
      stickerColor: "red",
    },
  });
  const stickerRedSales = await prisma.sticker.findMany({
    where: {
      stickerColor: "red",
    },
  });

  const stickerSilverCount = await prisma.sticker.count({
    where: {
      stickerColor: "silver",
    },
  });
  const stickerSilverSales = await prisma.sticker.findMany({
    where: {
      stickerColor: "silver",
    },
  });

  const totalSales = stickerSales.reduce(
    (total: any, current: any) => total + Number(current.amount),
    0
  );

  const totalGreenSales = stickerGreenSales.reduce(
    (total: any, current: any) => total + Number(current.amount),
    0
  );

  const totalYellowSales = stickerYellowSales.reduce(
    (total: any, current: any) => total + Number(current.amount),
    0
  );

  const totalWhiteSales = stickerWhiteSales.reduce(
    (total: any, current: any) => total + Number(current.amount),
    0
  );

  const totalRedSales = stickerRedSales.reduce(
    (total: any, current: any) => total + Number(current.amount),
    0
  );

  const totalSilverSales = stickerSilverSales.reduce(
    (total: any, current: any) => total + Number(current.amount),
    0
  );

  return (
    <div className="px-5 pt-20">
      <div className="gap-10">
        <div className="flex flex-col lg:flex-row lg:gap-10 px-5">
          <TotalStickerSales totalStickerSales={totalSales} />
          <StickerCount stickerCount={stickerCount} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-5 bg-slate-50/80 rounded-3xl shadow-sm backdrop-blur-3xl">
          <StickerCountGreen
            stickerGreenCount={stickerGreenCount}
            totalGreenSales={totalGreenSales}
          />
          <StickerCountYellow
            stickerYellowCount={stickerYellowCount}
            totalYellowSales={totalYellowSales}
          />
          <StickerCountWhite
            stickerWhiteCount={stickerWhiteCount}
            totalWhiteSales={totalWhiteSales}
          />
          <StickerCountRed
            stickerRedCount={stickerRedCount}
            totalRedSales={totalRedSales}
          />
          <StickerCountSilver
            stickerSilverCount={stickerSilverCount}
            totalSilverSales={totalSilverSales}
          />
        </div>
      </div>
    </div>
  );
}
