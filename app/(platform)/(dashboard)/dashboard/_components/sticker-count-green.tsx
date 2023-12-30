"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { urbanist } from "@/lib/constants";
import { cn, formatter } from "@/lib/utils";
import Image from "next/image";

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
        "relative w-full border-0 shadow-sm backdrop-opacity-20 backdrop-blur-3xl rounded-3xl overflow-hidden",
        urbanist.className
      )}
    >
      <Image
        src="/homeowner.svg"
        alt="homeowner"
        width={150}
        height={150}
        className="absolute right-5 top-2 object-contain rotate-12"
      />
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
