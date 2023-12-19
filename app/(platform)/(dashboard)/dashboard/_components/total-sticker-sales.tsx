"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bitter, openSans } from "@/lib/constants";
import { cn, formatter } from "@/lib/utils";
import { TrendingUpIcon } from "lucide-react";

export function TotalStickerSales({
  totalStickerSales,
}: {
  totalStickerSales: number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className={cn("flex items-center gap-2", bitter.className)}>
          Total Sticker Sales
          <TrendingUpIcon />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end">
          <h2
            className={cn(
              "text-3xl text-primary font-bold",
              openSans.className
            )}
          >
            {formatter.format(totalStickerSales)}
          </h2>
        </div>
      </CardContent>
    </Card>
  );
}
