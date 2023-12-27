"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { urbanist } from "@/lib/constants";
import { cn, formatter } from "@/lib/utils";

export function StickerCountYellow({
  stickerYellowCount,
  totalYellowSales,
}: {
  stickerYellowCount: number;
  totalYellowSales: number;
}) {
  return (
    <Card
      className={cn(
        "w-full border-0 shadow-sm backdrop-opacity-20 backdrop-blur-3xl rounded-3xl bg-yellow-100/70",
        urbanist.className
      )}
    >
      <CardHeader>
        <CardTitle className="flex flex-col text-left items-start font-thin text-xl gap-2">
          Tenant Stickers
          <span className="text-base font-medium">
            {formatter.format(totalYellowSales)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h2 className="text-2xl font-medium">
          {stickerYellowCount} <span className="text-base font-thin">Qty</span>
        </h2>
      </CardContent>
    </Card>
  );
}
