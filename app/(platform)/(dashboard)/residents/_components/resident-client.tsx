"use client";

import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { ResidentColumn, columns } from "./columns";
import { Button } from "@/components/ui/button";
import { CSVLink } from "react-csv";
import { DownloadIcon } from "lucide-react";

export function ResidentClient({ data }: { data: ResidentColumn[] }) {
  const csvData = [
    ["Name", "Phase", "Block", "Lot", "Contact Number"],
    ...data.map((resident) => [
      `${resident.name}`,
      resident.phase,
      resident.block,
      resident.lot,
      resident.contactNumber,
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
            filename="cvhoa-residents.csv"
            className="flex items-center justify-center gap-2"
          >
            <DownloadIcon className="w-4 h-4" />
            CSV
          </CSVLink>
        </Button>
        <DataTable columns={columns} data={data} searchKey={"name"} />
      </div>
    </>
  );
}
