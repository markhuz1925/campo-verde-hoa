"use client";

import { useModal } from "@/hooks/use-modal";
import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";

export function PurchaseStickerModal() {
  const [isMounted, setIsMounted] = useState(false);
  const isOpen = useModal((state) => state.isOpen);
  const onClose = useModal((state) => state.onClose);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Modal
      title="Purchase Sticker"
      description="Purchase a sticker"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="space-y-4 py-2 pb-4">Purchase Sticker</div>
    </Modal>
  );
}
