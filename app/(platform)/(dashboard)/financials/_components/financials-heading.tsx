"use client";

import { PageHeading } from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function FinancialsHeading() {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-center justify-between">
      <PageHeading
        title="Financials"
        description="View transactions. Create income and expense."
      />
      <Button>
        <Link href={"/financials/petty-cash"}>Petty Cash</Link>
      </Button>
    </div>
  );
}
