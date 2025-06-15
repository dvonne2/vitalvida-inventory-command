
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getStatusBadge } from "./daApprovalUtils";

type Delivery = {
  id: number;
  da: string;
  salesCount: number;
  bonus: string;
  flagged: boolean;
  state: string;
  customer: string;
  phone: string;
  status: string;
};

type Props = {
  delivery: Delivery;
};

const DAApprovalMobileCard = ({ delivery }: Props) => {
  return (
    <Card className="bg-slate-800/70 border-slate-700 p-0">
      <CardContent className="p-3 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-white">{delivery.da}</span>
          {getStatusBadge(delivery.status)}
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-slate-400">
          <span>Bonus: <span className="text-green-400 font-bold">{delivery.bonus}</span></span>
          <span>Sales: <span className="text-blue-400 font-bold">{delivery.salesCount}</span></span>
        </div>
        <div className="text-slate-300 text-xs">
          <span>{delivery.customer} ({delivery.phone})</span>
          <span className="block">State: {delivery.state}</span>
        </div>
        <Button
          size="sm"
          className={cn(
            delivery.status === "approved"
              ? "bg-green-600 hover:bg-green-700 text-white"
              : delivery.status === "pending"
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-red-600 hover:bg-red-700 text-white",
            "w-full text-xs mt-2"
          )}
        >
          {delivery.status === "approved"
            ? "View"
            : delivery.status === "flagged"
            ? "Flag"
            : "Approve"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DAApprovalMobileCard;
