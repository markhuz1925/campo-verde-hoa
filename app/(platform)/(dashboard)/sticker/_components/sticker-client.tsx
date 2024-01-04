"use client";

import { DataTable } from "@/components/ui/data-table";
import { StickerColumn, columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CSVLink } from "react-csv";
import { DownloadIcon } from "lucide-react";

export function StickerClient({ data }: { data: StickerColumn[] }) {
  const csvData = [
    [
      "Invoice#",
      "Name",
      "Phase",
      "Block",
      "Lot",
      "Sticker Color",
      "Sticker Number",
      "Date Purchased",
      "Amount",
    ],
    ...data.map((sticker) => [
      `${sticker.invoice}`,
      sticker.name,
      sticker.phase,
      sticker.block,
      sticker.lot,
      sticker.stickerColor,
      sticker.stickerNumber,
      sticker.stickerDate,
      sticker.amount,
    ]),
  ];

  return (
    <>
      <Separator />
      <div className="relative">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="absolute right-0"
        >
          <CSVLink
            data={csvData}
            separator=","
            filename="cvhoa-stickers.csv"
            className="flex items-center justify-center gap-2"
          >
            <DownloadIcon className="w-4 h-4" />
            CSV
          </CSVLink>
        </Button>
        <DataTable columns={columns} data={data} searchKey="name" />
      </div>
    </>
  );
}
