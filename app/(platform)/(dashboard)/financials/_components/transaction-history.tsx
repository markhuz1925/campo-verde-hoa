"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { urbanist } from "@/lib/constants";
import { cn, formatter } from "@/lib/utils";
import { Transaction } from "@prisma/client";
import { DownloadIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import {useEffect, useState} from "react";
import { CSVLink } from "react-csv";

export function TransactionHistory({ data }: { data: Transaction[] }) {
  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if (filter === "INCOME" || filter === "EXPENSE") {
      setFilteredData(data.filter((transaction) => transaction.type.toLowerCase() === filter.toLowerCase()));
    } else {
      setFilteredData(data); // If no filter is selected, show all data
    }
  }, [filter, data]);

  const csvData = [
    ["Invoice Number", "Name", "Date", "Amount", "Type"],
    ...filteredData.map((transaction) => [
      `${transaction.prefix}${transaction.id}`,
      transaction.name,
      transaction.date,
      transaction.amount,
      transaction.type,
    ]),
  ];

  return (
    <Card
      className={cn(
        "backdrop-blur-3xl rounded-3xl bg-slate-500/10 w-full h-[calc(100vh-25rem)] overflow-y-auto",
        urbanist.className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex gap-2 text-slate-800 font-thin">
          Transaction History
        </CardTitle>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <p className="font-thin">Filter by</p>
            <Button variant="link" size="sm" onClick={() => setFilter("INCOME")}>INCOME</Button>
            <Button variant="link" size="sm" onClick={() => setFilter("EXPENSE")}>EXPENSE</Button>
          </div>
          <Button variant="outline" size="sm" asChild>
            <CSVLink
              data={csvData}
              separator=","
              filename="cvhoa-transaction-history.csv"
              className="flex items-center justify-center gap-2"
            >
              <DownloadIcon className="w-4 h-4" />
              CSV
            </CSVLink>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2 overflow-hidden">
          {filteredData.map((transaction) => (
            <Card key={transaction.id} className="py-2">
              <div className="flex flex-col w-full px-5 pb-2">
                <p className="w-fit font-medium">
                  <span className="font-thin">Invoice# </span>
                  {`${transaction.prefix}${transaction.id}`}
                </p>
              </div>
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-10 uppercase font-thin text-base px-5">
                <div className="flex flex-row items-center gap-2 font-medium w-full">
                  {transaction.type === "income" ? (
                    <TrendingUpIcon className="text-green-800 w-4 h-4 shrink-0" />
                  ) : (
                    <TrendingDownIcon className="text-red-800 w-4 h-4 shrink-0" />
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
