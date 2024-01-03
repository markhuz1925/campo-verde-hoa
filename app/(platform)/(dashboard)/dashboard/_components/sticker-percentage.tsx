import { getStickerPercentage } from "@/app/functions/stickers";
import { urbanist } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { PercentIcon } from "lucide-react";

export async function StickerPercentage() {
  const percentage = await getStickerPercentage();

  return (
    <div
      className={cn(
        "flex flex-row items-center justify-center w-full self-center gap-3 mb-10 lg:mb-0",
        urbanist.className
      )}
    >
      <div className="flex items-center justify-center rounded-full w-12 h-12 border shadow">
        <PercentIcon className="text-neutral-500" />
      </div>
      <div className="flex flex-col">
        <p className="font-thin">Stickers sold(%)</p>
        <h6 className="text-3xl">{Math.round(percentage)}%</h6>
      </div>
    </div>
  );
}
