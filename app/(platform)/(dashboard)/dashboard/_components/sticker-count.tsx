"use client";

import { urbanist } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { BadgeDollarSignIcon } from "lucide-react";

export function StickerCount({ stickerCount }: { stickerCount: number }) {
  return (
    <div
      className={cn(
        "flex flex-row items-center justify-center w-full self-center gap-3 mt-20",
        urbanist.className
      )}
    >
      <div className="flex items-center justify-center rounded-full w-12 h-12 border shadow">
        <BadgeDollarSignIcon className="text-neutral-500" />
      </div>
      <div className="flex flex-col">
        <p className="font-thin">Stickers sold</p>
        <h6 className="text-3xl">
          {stickerCount} <span className="text-base font-thin">Qty</span>
        </h6>
      </div>
    </div>
  );
}
