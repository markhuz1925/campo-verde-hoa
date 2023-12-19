"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bitter, openSans } from "@/lib/constants";
import { cn, formatter } from "@/lib/utils";

export function StickerCountGreen({
  stickerGreenCount,
  totalGreenSales,
}: {
  stickerGreenCount: number;
  totalGreenSales: number;
}) {
  return (
    <Card className="bg-primary">
      <CardHeader>
        <CardTitle
          className={cn("flex items-center gap-2 text-white", bitter.className)}
        >
          Homeowner Stickers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-lg text-primary-foreground font-semibold">
            {formatter.format(totalGreenSales)}
          </p>
          <h2
            className={cn(
              "text-3xl text-primary-foreground font-bold",
              openSans.className
            )}
          >
            {stickerGreenCount}
          </h2>
        </div>
      </CardContent>
    </Card>
  );
}
