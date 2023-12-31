"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { urbanist } from "@/lib/constants";
import { cn, formatter } from "@/lib/utils";
import { Transaction } from "@prisma/client";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

export function TransactionHistory({ data }: { data: Transaction[] }) {
  return (
    <Card
      className={cn(
        "backdrop-blur-3xl rounded-3xl bg-slate-500/10 w-full h-[calc(100vh-25rem)] overflow-y-auto",
        urbanist.className
      )}
    >
      <CardHeader>
        <CardTitle className="flex gap-2 text-slate-800 font-thin">
          Transaction History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2 overflow-hidden">
          {data.map((transaction) => (
            <Card key={transaction.id}>
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-10 uppercase font-thin text-base p-5">
                <div className="flex flex-row items-center gap-2 font-medium w-full">
                  {transaction.type === "income" ? (
                    <TrendingUpIcon className="text-green-800 w-4 h-4" />
                  ) : (
                    <TrendingDownIcon className="text-red-800 w-4 h-4" />
                  )}
                  <p>{transaction.name}</p>
                </div>
                <p className="w-full font-medium">{transaction.date}</p>
                <p
                  className={cn(
                    "w-full font-medium",
                    transaction.type === "income" &&
                      "before:content-['+'] text-green-900",

                    transaction.type === "expense" &&
                      "before:content-['-'] text-red-900"
                  )}
                >
                  {formatter.format(Number(transaction.amount))}
                </p>
                <p
                  className={cn(
                    "p-1 text-xs font-medium rounded w-fit",
                    transaction.type === "income" &&
                      "bg-green-50 text-green-900",
                    transaction.type === "expense" && "bg-red-50 text-red-900"
                  )}
                >
                  {transaction.type}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
