"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { urbanist } from "@/lib/constants";
import { cn, formatter } from "@/lib/utils";
import Image from "next/image";

export function StickerRed({ count, sales }: { count: number; sales: number }) {
  return (
    <Card
      className={cn(
        "relative w-full border-0 shadow-sm backdrop-opacity-20 backdrop-blur-3xl rounded-3xl overflow-hidden",
        urbanist.className
      )}
    >
      <CardHeader className="flex flex-col md:flex-row md:gap-5">
        <Image
          src="/delivery.svg"
          alt="delivery"
          width={64}
          height={64}
          className="self-start object-contain"
        />
        <CardTitle className="flex flex-col text-left items-start gap-2">
          <div className="flex flex-col">
            <p className="font-thin text-xl">Delivery Stickers</p>
            <span className="text-base font-medium">
              {formatter.format(sales)}
            </span>
          </div>
          <p className="text-2xl font-medium">
            {count} <span className="text-base font-thin">Qty</span>
          </p>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
