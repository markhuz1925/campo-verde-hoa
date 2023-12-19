"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bitter, openSans } from "@/lib/constants";
import { cn, formatter } from "@/lib/utils";

export function StickerCountYellow({
  stickerYellowCount,
  totalYellowSales,
}: {
  stickerYellowCount: number;
  totalYellowSales: number;
}) {
  return (
    <Card className="bg-yellow-300">
      <CardHeader>
        <CardTitle
          className={cn(
            "flex items-center gap-2 text-yellow-900",
            bitter.className
          )}
        >
          Tenant Stickers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-lg text-yellow-900 font-semibold">
            {formatter.format(totalYellowSales)}
          </p>
          <h2
            className={cn(
              "text-3xl text-yellow-900 font-bold",
              openSans.className
            )}
          >
            {stickerYellowCount}
          </h2>
        </div>
      </CardContent>
    </Card>
  );
}
