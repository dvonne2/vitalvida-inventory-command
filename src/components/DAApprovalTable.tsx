
import React from "react";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell
} from "@/components/ui/table";
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
  deliveries: Delivery[];
};

const DAApprovalTable = ({ deliveries }: Props) => {
  return (
    <div className="overflow-x-auto w-full">
      <Table className="min-w-[620px] md:min-w-full text-xs md:text-sm">
        <TableHeader>
          <TableRow className="border-slate-700 bg-slate-800/80">
            <TableHead className="text-slate-400 font-medium px-3 py-2">DA</TableHead>
            <TableHead className="text-slate-400 font-medium px-3 py-2 whitespace-nowrap">Sales</TableHead>
            <TableHead className="text-slate-400 font-medium px-3 py-2">Bonus</TableHead>
            <TableHead className="text-slate-400 font-medium px-3 py-2">State</TableHead>
            <TableHead className="text-slate-400 font-medium px-3 py-2 whitespace-nowrap hidden xs:table-cell">Customer</TableHead>
            <TableHead className="text-slate-400 font-medium px-3 py-2 hidden xs:table-cell">Phone</TableHead>
            <TableHead className="text-slate-400 font-medium px-3 py-2 text-center">Status</TableHead>
            <TableHead className="text-slate-400 font-medium px-3 py-2 text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deliveries.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-slate-400">
                No records found.
              </TableCell>
            </TableRow>
          ) : (
            deliveries.map((item) => (
              <TableRow key={item.id} className="border-slate-700 hover:bg-slate-700/30 transition-colors">
                <TableCell className="text-white font-medium px-3 py-2">{item.da}</TableCell>
                <TableCell className="text-blue-400 px-3 py-2 text-center">{item.salesCount}</TableCell>
                <TableCell className="text-green-400 px-3 py-2 text-center">{item.bonus}</TableCell>
                <TableCell className="text-slate-300 px-3 py-2">{item.state}</TableCell>
                <TableCell className="text-slate-300 px-3 py-2 whitespace-nowrap hidden xs:table-cell">{item.customer}</TableCell>
                <TableCell className="text-slate-300 px-3 py-2 hidden xs:table-cell">{item.phone}</TableCell>
                <TableCell className="px-3 py-2 text-center">{getStatusBadge(item.status)}</TableCell>
                <TableCell className="px-3 py-2 text-center">
                  <Button
                    size="sm"
                    className={cn(
                      item.status === "approved"
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : item.status === "pending"
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-red-600 hover:bg-red-700 text-white",
                      "w-20 text-xs md:text-sm"
                    )}
                  >
                    {item.status === "approved"
                      ? "View"
                      : item.status === "flagged"
                      ? "Flag"
                      : "Approve"}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DAApprovalTable;
