import { PageHeading } from "@/components/page-heading";
import { Separator } from "@/components/ui/separator";
import { PettyCashFund } from "./_components/petty-cash-fund";
import { getPettyCash } from "@/app/functions/petty-cash";

export default async function PettyCash() {
  const totalPettyCashFund = await getPettyCash();
  return (
    <div className="pt-20 px-5 pb-5">
      <PageHeading
        title={"Petty Cash Fund"}
        description={"View Transactions. Cash in bank and create expense."}
      />
      <Separator className="my-5" />
      <PettyCashFund data={totalPettyCashFund} />
    </div>
  );
}
