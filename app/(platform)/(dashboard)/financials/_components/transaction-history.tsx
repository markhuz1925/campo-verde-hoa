"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { urbanist } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Transaction } from "@prisma/client";

export function TransactionHistory({ data }: { data: Transaction[] }) {
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
      <CardContent>
        <div className="flex flex-col gap-5">
          {data.map((transaction) => (
            <div key={transaction.id} className="flex flex-row gap-10">
              <div className="flex flex-col">
                <p>Invoice</p>
                <p>{`${transaction.prefix}${transaction.id}`}</p>
              </div>
              <div className="flex flex-col">
                <p>Type</p>
                <p>{transaction.type}</p>
              </div>
              <div className="flex flex-col">
                <p>Description</p>
                <p>{transaction.name}</p>
              </div>
              <div className="flex flex-col">
                <p>Date</p>
                <p>{transaction.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
