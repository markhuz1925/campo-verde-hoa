"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sticker } from "@prisma/client";
import Link from "next/link";
import { useParams } from "next/navigation";

export function PurchasedStickers({
  purchasrdStickers,
}: {
  purchasrdStickers: Sticker[] | null;
}) {
  const params = useParams();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Purchased Stickers
          <Button asChild variant="secondary" size="sm">
            <Link href={`/residents/${params.residentId}/purchase-sticker`}>
              Purchase Sticker
            </Link>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          {purchasrdStickers && purchasrdStickers.length > 0 ? (
            purchasrdStickers.map((sticker: Sticker) => (
              <div key={sticker.id}>
                {/* Render information for each purchased sticker */}
                <p>Name: {sticker.name}</p>
                <p>Plate: {sticker.plate}</p>
                <p>Sticker Color: {sticker.stickerColor}</p>
                <p>Sticker Number: {`CVHOA-${sticker.stickerNumber}`}</p>
                {/* Add other properties as needed */}
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
