"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { urbanist } from "@/lib/constants";
import { cn, formatter } from "@/lib/utils";
import { PlusCircleIcon, TrendingDownIcon } from "lucide-react";

export function TotalExpense({ data }: { data: number }) {
  return (
    <Card
      className={cn(
        "w-full border-0 backdrop-opacity-20 backdrop-blur-3xl rounded-3xl bg-white/20",
        urbanist.className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex gap-2 text-red-800 font-thin">
          Total Expenses
          <TrendingDownIcon />
        </CardTitle>
        <Button variant="ghost" size="icon">
          <PlusCircleIcon className="text-red-800" />
        </Button>
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            "flex flex-col justify-end md:flex-row w-full",
            urbanist.className
          )}
        >
          <h2 className="text-3xl md:text-6xl text-slate-800 font-medium">
            <span className="self-end text-2xl md:text-5xl font-thin">₱</span>
            {formatter.format(Number(data) || 0).split("₱")}
          </h2>
        </div>
      </CardContent>
    </Card>
  );
}
