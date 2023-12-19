"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bitter, openSans } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { BadgeDollarSignIcon } from "lucide-react";

export function StickerCount({ stickerCount }: { stickerCount: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className={cn("flex items-center gap-2", bitter.className)}>
          Purchased Stickers
          <BadgeDollarSignIcon />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end">
          <h2
            className={cn(
              "text-3xl text-primary font-bold",
              openSans.className
            )}
          >
            {stickerCount}
          </h2>
        </div>
      </CardContent>
    </Card>
  );
}
