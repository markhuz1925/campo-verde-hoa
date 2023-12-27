"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { urbanist } from "@/lib/constants";
import { cn, formatter } from "@/lib/utils";

export function StickerCountGreen({
  stickerGreenCount,
  totalGreenSales,
}: {
  stickerGreenCount: number;
  totalGreenSales: number;
}) {
  return (
    <Card
      className={cn(
        "w-full border-0 shadow-sm backdrop-opacity-20 backdrop-blur-3xl rounded-3xl bg-green-100",
        urbanist.className
      )}
    >
      <CardHeader>
        <CardTitle className="flex flex-col text-left items-start font-thin text-xl gap-2">
          Homeowner Stickers
          <span className="text-base font-medium">
            {formatter.format(totalGreenSales)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h2 className="text-2xl font-medium">
          {stickerGreenCount} <span className="text-base font-thin">Qty</span>
        </h2>
      </CardContent>
    </Card>
  );
}
