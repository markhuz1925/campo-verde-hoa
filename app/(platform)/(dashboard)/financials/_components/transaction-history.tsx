"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { urbanist } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function TransactionHistory() {
  return (
    <Card
      className={cn(
        "w-full backdrop-opacity-20 backdrop-blur-3xl rounded-3xl bg-white/20",
        urbanist.className
      )}
    >
      <CardHeader>
        <CardTitle className="flex gap-2 text-slate-800 font-thin">
          Transaction History
        </CardTitle>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
