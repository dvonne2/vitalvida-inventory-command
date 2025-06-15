import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { UserCheck, Users, Shield, CheckCircle, AlertTriangle, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

// Dummy data for the tracker
const dummyDeliveries = [
  {
    id: 1,
    da: "Femi",
    salesCount: 16,
    bonus: "₦16,000",
    flagged: false,
    state: "Lagos",
    customer: "Mrs. Adebayo",
    phone: "+2348123456789",
    status: "pending",
  },
  {
    id: 2,
    da: "Chidi",
    salesCount: 12,
    bonus: "₦12,000",
    flagged: true,
    state: "Abuja",
    customer: "Mr. Obi",
    phone: "+234867530909",
    status: "flagged",
  },
  {
    id: 3,
    da: "Amaka",
    salesCount: 14,
    bonus: "₦14,000",
    flagged: false,
    state: "Enugu",
    customer: "Miss Uche",
    phone: "+234899778822",
    status: "approved",
  },
];

type Props = {
  userRole: "inventory_manager" | "telesales" | "accountant" | "admin";
  userId: string;
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500 text-xs md:text-sm">⏳ Pending</Badge>;
    case "approved":
      return <Badge className="bg-green-500/20 text-green-400 border-green-500 text-xs md:text-sm">✅ Approved</Badge>;
    case "flagged":
      return <Badge className="bg-red-500/20 text-red-400 border-red-500 text-xs md:text-sm">⚠️ Flagged</Badge>;
    default:
      return null;
  }
};

const DADeliveryApprovalTracker = ({ userRole }: Props) => {
  const [search, setSearch] = useState("");

  // Filter deliveries for search and responsiveness
  const filteredDeliveries = dummyDeliveries.filter(
    (d) =>
      d.da.toLowerCase().includes(search.toLowerCase()) ||
      d.customer.toLowerCase().includes(search.toLowerCase()) ||
      d.state.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Panel Header with search */}
      <Card className="bg-slate-800/50 border-slate-700 md:mb-6 mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-white flex items-center gap-2 text-base md:text-xl">
            <UserCheck className="h-5 w-5 md:h-6 md:w-6 text-blue-400" />
            Delivery Approval Tracker
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 pb-1">
          <Input
            placeholder="Search DA, customer, or state"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-slate-700 border-slate-600 text-white max-w-full md:max-w-xs"
            size={search.length > 0 ? "default" : "sm"}
          />
          <div className="flex gap-2 flex-wrap">
            <Badge className="bg-indigo-500/20 border-indigo-500 text-indigo-400 text-xs md:text-sm">DA Approvals</Badge>
            <Badge className="bg-green-500/20 border-green-500 text-green-400 text-xs md:text-sm">Bonuses</Badge>
            <Badge className="bg-yellow-500/20 border-yellow-500 text-yellow-400 text-xs md:text-sm">Flagged</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Approvals Table: make horizontally scrollable on mobile */}
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
            {filteredDeliveries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-slate-400">
                  No records found.
                </TableCell>
              </TableRow>
            ) : (
              filteredDeliveries.map((item) => (
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

      {/* Mobile Cards for each delivery, visible only on mobile (optional, further enhancement for tiny screens) */}
      <div className="space-y-3 mt-3 md:hidden">
        {filteredDeliveries.map((item) => (
          <Card key={item.id} className="bg-slate-800/70 border-slate-700 p-0">
            <CardContent className="p-3 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-white">{item.da}</span>
                {getStatusBadge(item.status)}
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                <span>Bonus: <span className="text-green-400 font-bold">{item.bonus}</span></span>
                <span>Sales: <span className="text-blue-400 font-bold">{item.salesCount}</span></span>
              </div>
              <div className="text-slate-300 text-xs">
                <span>{item.customer} ({item.phone})</span>
                <span className="block">State: {item.state}</span>
              </div>
              <Button
                size="sm"
                className={cn(
                  item.status === "approved"
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : item.status === "pending"
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-red-600 hover:bg-red-700 text-white",
                  "w-full text-xs mt-2"
                )}
              >
                {item.status === "approved"
                  ? "View"
                  : item.status === "flagged"
                  ? "Flag"
                  : "Approve"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DADeliveryApprovalTracker;
