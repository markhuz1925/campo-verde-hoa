"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export function HoaDues({ data }: { data: any[] | null }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Unpaid Dues</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          {data && data.length > 0 ? (
            data.map((dues: any) => (
              <div key={dues.id}>
                {/* Render information for each purchased sticker */}
                <p>Name: {dues.amount}</p>
                {/* Add other properties as needed */}
              </div>
            ))
          ) : (
            <Alert variant="success">
              <CheckCircle className="w-4 h-4" />
              <AlertTitle>Congratulations!</AlertTitle>
              <AlertDescription>You do not have unpaid dues</AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
