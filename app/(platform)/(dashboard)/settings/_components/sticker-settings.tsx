"use client";

import { StickerModal } from "@/components/modals/sticker-modal";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import { bitter } from "@/lib/constants";
import { cn, formatter } from "@/lib/utils";
import { StickerPrice } from "@prisma/client";

export function StickerSettings({ data }: { data: StickerPrice[] }) {
  const stickerModal = useModal();

  return (
    <div className="flex flex-col pt-10 w-full">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <StickerModal />
          <h2 className={cn("text-xl font-semibold", bitter.className)}>
            Sticker Settings
          </h2>
          <Button onClick={stickerModal.onOpen}>New Sticker</Button>
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          {data.map((sticker) => (
            <div key={sticker.id}>
              <p className="uppercase">{sticker.name}</p>
              <p>{formatter.format(Number(sticker.price))}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
