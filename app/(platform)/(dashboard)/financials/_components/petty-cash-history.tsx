"use client";

import {PettyCash} from "@prisma/client";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import {urbanist} from "@/lib/constants";

export function PettyCashHistory({data}: {data: PettyCash[]}) {

  return (
    <Card className={cn(
      "backdrop-blur-3xl rounded-3xl bg-slate-500/10 w-full h-[calc(100vh-25rem)] overflow-y-auto",
      urbanist.className
    )}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex gap-2 text-slate-800 font-thin">
          Petty Cash History
        </CardTitle>
      </CardHeader>
      <CardContent>

      </CardContent>
    </Card>
  )
}