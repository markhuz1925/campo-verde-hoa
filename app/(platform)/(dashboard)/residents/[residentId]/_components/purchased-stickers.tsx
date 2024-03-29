"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bitter, urbanist } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Sticker } from "@prisma/client";
import Link from "next/link";
import { useParams } from "next/navigation";

export function PurchasedStickers({
  purchasedStickers,
}: {
  purchasedStickers: Sticker[] | null;
}) {
  const params = useParams();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-2">
            <p>Purchased Stickers</p>
            <span className="flex items-center justify-center rounded-full bg-gray-200 w-5 h-5 text-xs">
              {purchasedStickers?.length}
            </span>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href={`/residents/${params.residentId}/purchase-sticker`}>
              Purchase Sticker
            </Link>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          {purchasedStickers && purchasedStickers.length > 0 ? (
            purchasedStickers.map((sticker: any) => (
              <div
                key={sticker.id}
                className={cn(
                  "flex flex-row items-start uppercase gap-5 rounded-lg border p-2",
                  sticker.stickerColor === "green" &&
                    "border-l-green-800 border-l-4",
                  sticker.stickerColor === "yellow" &&
                    "border-l-yellow-400 border-l-4",
                  sticker.stickerColor === "red" &&
                    "border-l-red-600 border-l-4",
                  sticker.stickerColor === "silver" &&
                    "border-l-gary-400 border-l-4"
                )}
              >
                <div className="flex flex-col">
                  <p className="text-sm font-semibold">{sticker.name}</p>
                  <p
                    className={cn(
                      "text-xs font-semibold bg-neutral-700 text-white text-center p-1 rounded",
                      bitter.className
                    )}
                  >
                    {sticker.driverLicense}
                  </p>
                </div>
                <div
                  className={cn(
                    "flex flex-col text-sm font-medium",
                    urbanist.className
                  )}
                >
                  <p>
                    Plate:{" "}
                    <span className={cn("font-bold", bitter.className)}>
                      {sticker.plate}
                    </span>
                  </p>
                  <p>
                    Sticker Color:{" "}
                    <span className={cn("font-bold", bitter.className)}>
                      {sticker.stickerColor}
                    </span>
                  </p>
                  <p>
                    Sticker Number:{" "}
                    <span
                      className={cn("font-bold", bitter.className)}
                    >{`CVHOA-${sticker.stickerNumber}`}</span>
                  </p>
                  <p>
                    Invoice Number:{" "}
                    <span
                      className={cn("font-bold", bitter.className)}
                    >{`${sticker.transaction.prefix}${sticker.transactionId}`}</span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div>No purchased sticker</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
