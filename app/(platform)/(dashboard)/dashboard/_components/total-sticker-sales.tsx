"use client";

import { Card, CardContent } from "@/components/ui/card";
import { urbanist } from "@/lib/constants";
import { cn, formatter } from "@/lib/utils";
import { TrendingUpIcon } from "lucide-react";

export function TotalStickerSales({
  totalStickerSales,
}: {
  totalStickerSales: number;
}) {
  return (
    <Card className="w-full border-0 mt-20 shadow-none backdrop-opacity-20 backdrop-blur-3xl rounded-3xl bg-white/10">
      <CardContent>
        <div
          className={cn("flex flex-col md:flex-row w-full", urbanist.className)}
        >
          <div className="flex items-center justify-center rounded-full border shadow w-20 h-20 self-center mr-10">
            <TrendingUpIcon className="w-12 h-12 text-neutral-500" />
          </div>
          <h2 className="text-9xl text-neutral-800 font-medium">
            <span className="self-end text-7xl font-thin">₱</span>
            {formatter.format(totalStickerSales).split("₱")}
          </h2>
        </div>
      </CardContent>
    </Card>
  );
}
