"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { urbanist } from "@/lib/constants";
import { cn, formatter } from "@/lib/utils";
import { PlusCircleIcon, TrendingUpIcon } from "lucide-react";

export function TotalHoaFunds({ data }: { data: number }) {
  return (
    <Card
      className={cn(
        "w-full border-0 shadow-none backdrop-opacity-20 backdrop-blur-3xl rounded-3xl bg-white/20",
        urbanist.className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex gap-2 text-green-800 font-thin">
          Total HOA Funds
          <TrendingUpIcon />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            "flex flex-col justify-end md:flex-row w-full",
            urbanist.className
          )}
        >
          <h2 className="text-4xl md:text-7xl text-slate-800 font-medium">
            <span className="self-end text-2xl md:text-5xl font-thin">₱</span>
            {formatter.format(Number(data)).split("₱")}
          </h2>
        </div>
      </CardContent>
    </Card>
  );
}
