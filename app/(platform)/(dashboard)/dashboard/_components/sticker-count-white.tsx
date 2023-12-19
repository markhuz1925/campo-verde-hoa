"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bitter, openSans } from "@/lib/constants";
import { cn, formatter } from "@/lib/utils";

export function StickerCountWhite({
  stickerWhiteCount,
  totalWhiteSales,
}: {
  stickerWhiteCount: number;
  totalWhiteSales: number;
}) {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle
          className={cn(
            "flex items-center gap-2 text-neutral-900",
            bitter.className
          )}
        >
          Visitor Stickers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-lg text-neutral-900 font-semibold">
            {formatter.format(totalWhiteSales)}
          </p>
          <h2
            className={cn(
              "text-3xl text-neutral-900 font-bold",
              openSans.className
            )}
          >
            {stickerWhiteCount}
          </h2>
        </div>
      </CardContent>
    </Card>
  );
}
