import { getStickerSales } from "@/app/functions/stickers";
import { Card, CardContent } from "@/components/ui/card";
import { urbanist } from "@/lib/constants";
import { cn, formatter } from "@/lib/utils";

export async function TotalStickerSales() {
  const stickerSales = await getStickerSales();

  return (
    <Card className="w-full border-0 shadow-none backdrop-opacity-20 backdrop-blur-3xl rounded-3xl bg-white/10">
      <CardContent>
        <div
          className={cn(
            "flex flex-col items-center justify-center md:flex-row w-full",
            urbanist.className
          )}
        >
          <h2 className="text-4xl text-neutral-800 font-medium">
            <span className="self-end text-2xl font-thin">₱</span>
            {formatter.format(stickerSales).split("₱")}
          </h2>
        </div>
      </CardContent>
    </Card>
  );
}
