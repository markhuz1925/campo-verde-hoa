import { getStickerStatistics } from "@/app/functions/stickers";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { urbanist } from "@/lib/constants";
import { cn, formatter } from "@/lib/utils";
import Image from "next/image";

export async function StickerRed() {
  const [redCount, redSales, redPercentage] = await Promise.all([
    getStickerStatistics("red", "count"),
    getStickerStatistics("red", "sum"),
    getStickerStatistics("red", "percentage"),
  ]);

  return (
    <Card
      className={cn(
        "relative w-full border-0 shadow-sm backdrop-opacity-20 backdrop-blur-3xl rounded-3xl overflow-hidden",
        urbanist.className
      )}
    >
      <CardHeader className="flex flex-col md:flex-row md:gap-5 w-full">
        <Image
          src="/delivery.svg"
          alt="delivery"
          width={64}
          height={64}
          className="self-start object-contain"
        />
        <CardTitle className="flex flex-col text-left items-start gap-2 w-full">
          <div className="flex items-start justify-between w-full">
            <div className="flex flex-col">
              <p className="font-thin text-xl">Delivery Stickers</p>
              <span className="text-base font-medium">
                {redSales ? formatter.format(redSales) : "$0"}
              </span>
            </div>
            <p className="text-xl font-medium text-slate-500">
              {redPercentage ? Math.round(redPercentage) : 0}%
            </p>
          </div>
          <p className="text-2xl font-medium">
            {redCount} <span className="text-base font-thin">Qty</span>
          </p>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
