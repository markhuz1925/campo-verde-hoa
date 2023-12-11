"use client";

import { PageHeading } from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";

export function MemberHeading() {
  const registerMember = useModal();

  return (
    <div className="flex items-center justify-between">
      <PageHeading
        title="Members"
        description="Manage your members. You can register, update and view details of a member."
      />
      <Button onClick={registerMember.onOpen}>Register Member</Button>
    </div>
  );
}
