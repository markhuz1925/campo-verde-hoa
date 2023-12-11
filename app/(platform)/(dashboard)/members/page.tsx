import { PageHeading } from "@/components/page-heading";
import { Button } from "@/components/ui/button";

export default function MembersPage() {
  return (
    <div className="pt-20 px-5">
      <div className="flex items-center justify-between">
        <PageHeading
          title="Members"
          description="Manage your members. You can register, update and view details of a member."
        />
        <Button>Register Member</Button>
      </div>
    </div>
  );
}
