"use client";

import { Card, CardContent } from "@/components/ui/card";
import { urbanist } from "@/lib/constants";
import { cn, formatter } from "@/lib/utils";

export function TotalStickerSales({
  totalStickerSales,
}: {
  totalStickerSales: number;
}) {
  return (
    <Card className="w-full border-0 mt-20 shadow-none backdrop-opacity-20 backdrop-blur-3xl rounded-3xl bg-white/10">
      <CardContent>
        <div
          className={cn(
            "flex flex-col items-center justify-center md:flex-row w-full",
            urbanist.className
          )}
        >
          <h2 className="text-6xl md:text-9xl text-neutral-800 font-medium">
            <span className="self-end text-4xl md:text-7xl font-thin">₱</span>
            {formatter.format(totalStickerSales).split("₱")}
          </h2>
        </div>
      </CardContent>
    </Card>
  );
}
