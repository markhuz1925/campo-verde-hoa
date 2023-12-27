"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bitter, openSans, urbanist } from "@/lib/constants";
import { cn, formatter } from "@/lib/utils";

export function StickerCountWhite({
  stickerWhiteCount,
  totalWhiteSales,
}: {
  stickerWhiteCount: number;
  totalWhiteSales: number;
}) {
  return (
    <Card
      className={cn(
        "w-full border-0 shadow-sm backdrop-opacity-20 backdrop-blur-3xl rounded-3xl bg-white/70",
        urbanist.className
      )}
    >
      <CardHeader>
        <CardTitle className="flex flex-col text-left items-start font-thin text-xl gap-2">
          Visitor Stickers
          <span className="text-base font-medium">
            {formatter.format(totalWhiteSales)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h2 className="text-2xl font-medium">
          {stickerWhiteCount} <span className="text-base font-thin">Qty</span>
        </h2>
      </CardContent>
    </Card>
  );
}
