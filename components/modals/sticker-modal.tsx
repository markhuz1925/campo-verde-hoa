"use client";

import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/use-modal";
import { useEffect, useState } from "react";

export function StickerModal() {
  const [isMounted, setIsMounted] = useState(false);

  const onOpen = useModal((state) => state.onOpen);
  const onClose = useModal((state) => state.onClose);
  const isOpen = useModal((state) => state.isOpen);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  if (!isMounted) return null;

  return (
    <Modal
      title="Setup Sticker"
      description="Setup your sticker prices and colors"
      isOpen={isOpen}
      onClose={onClose}
    >
      sticker form
    </Modal>
  );
}
