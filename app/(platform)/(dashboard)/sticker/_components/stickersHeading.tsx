"use client";

import { PageHeading } from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";

export function StickersHeading() {
  const purchaseSticker = useModal();

  return (
    <div className="flex items-center justify-between">
      <PageHeading
        title="Stickers"
        description="View purchased stickers. Buy stickers for visitors and deliveries. For visitor of tenants and homeowners, tenants and homeowners can purchase stickers in Residents page."
      />
      <Button onClick={purchaseSticker.onOpen}>
        Purchase sticker (visitor & deliveries)
      </Button>
    </div>
  );
}
