"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useModal } from "@/hooks/use-modal";
import { Sticker } from "@prisma/client";

export function PurchasedStickers({ data }: { data: Sticker[] | null }) {
  const purchaseSticker = useModal();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Purchased Stickers
          <Button
            onClick={() => purchaseSticker.onOpen()}
            variant="secondary"
            size="sm"
          >
            Purchase Sticker
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          {data && data.length > 0 ? (
            data.map((sticker: Sticker) => (
              <div key={sticker.id}>
                {/* Render information for each purchased sticker */}
                <p>Name: {sticker.name}</p>
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
