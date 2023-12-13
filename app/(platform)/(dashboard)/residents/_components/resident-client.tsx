"use client";

import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { ResidentColumn, columns } from "./columns";

export function ResidetClient({ data }: { data: ResidentColumn[] }) {
  return (
    <>
      <Separator />
      <DataTable columns={columns} data={data} searchKey={"lastName"} />
    </>
  );
}
