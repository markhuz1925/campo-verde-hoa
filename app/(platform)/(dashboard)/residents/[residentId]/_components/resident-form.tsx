"use client";

import { PageHeading } from "@/components/page-heading";
import { Resident } from "@prisma/client";

export function ResidentForm({ resident }: { resident: Resident | null }) {
  return (
    <div>
      <PageHeading
        title="Edit Resident"
        description="Edit details of a resident."
      />
    </div>
  );
}
