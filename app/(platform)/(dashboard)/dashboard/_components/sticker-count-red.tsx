"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bitter, openSans } from "@/lib/constants";
import { cn, formatter } from "@/lib/utils";

export function StickerCountRed({
  stickerRedCount,
  totalRedSales,
}: {
  stickerRedCount: number;
  totalRedSales: number;
}) {
  return (
    <Card className="bg-red-600">
      <CardHeader>
        <CardTitle
          className={cn(
            "flex items-center gap-2 text-neutral-100",
            bitter.className
          )}
        >
          Delivery Stickers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-lg text-neutral-100 font-semibold">
            {formatter.format(totalRedSales)}
          </p>
          <h2
            className={cn(
              "text-3xl text-neutral-100 font-bold",
              openSans.className
            )}
          >
            {stickerRedCount}
          </h2>
        </div>
      </CardContent>
    </Card>
  );
}
