
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { UserCheck, Users, Shield, CheckCircle, AlertTriangle, MessageSquare, check as CheckIcon, x as XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import DAApprovalTable from "./DAApprovalTable";
import DAApprovalMobileCard from "./DAApprovalMobileCard";
import { getStatusBadge } from "./daApprovalUtils";
import { UserRole } from "@/types";

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

// Dummy data matching screenshot for "SKU Level" table
const skuTableData = [
  {
    da: "Femi", product: "Shampoo", sku: "484113...", assigned: 10, delivered: 10,
    payment: true, otp: true, countedAsSold: 10, bonusStatus: "full"
  },
  {
    da: "Femi", product: "Pomade", sku: "483026...", assigned: 6, delivered: 6,
    payment: true, otp: true, countedAsSold: 6, bonusStatus: "full"
  },
  {
    da: "Femi", product: "Conditioner", sku: "483001...", assigned: 4, delivered: 4,
    payment: false, otp: false, countedAsSold: 0, bonusStatus: "none"
  },
  {
    da: "Tobi", product: "Shampoo", sku: "484113...", assigned: 8, delivered: 6,
    payment: true, otp: true, countedAsSold: 6, bonusStatus: "full"
  },
  {
    da: "Tobi", product: "Pomade", sku: "483026...", assigned: 5, delivered: 5,
    payment: false, otp: true, countedAsSold: 0, bonusStatus: "none"
  },
  {
    da: "Amaka", product: "Hydration Tea", sku: "484200...", assigned: 3, delivered: 3,
    payment: true, otp: true, countedAsSold: 3, bonusStatus: "full"
  },
];

type Props = {
  userRole: UserRole;
  userId: string;
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
          />
          <div className="flex gap-2 flex-wrap">
            <Badge className="bg-indigo-500/20 border-indigo-500 text-indigo-400 text-xs md:text-sm">DA Approvals</Badge>
            <Badge className="bg-green-500/20 border-green-500 text-green-400 text-xs md:text-sm">Bonuses</Badge>
            <Badge className="bg-yellow-500/20 border-yellow-500 text-yellow-400 text-xs md:text-sm">Flagged</Badge>
          </div>
        </CardContent>
      </Card>

      {/* SKU Level Table - as shown in screenshot */}
      <Card className="bg-slate-900/80 border-slate-800 mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-white flex items-center gap-2 text-lg">
            <span className="text-green-400">📈</span>
            DA Stock Sold Tracker (This Week) - SKU Level
          </CardTitle>
          <p className="text-slate-400 text-sm mt-1">
            Only units with delivery + payment + OTP count as sold and eligible for bonus
          </p>
        </CardHeader>
        <CardContent className="pt-0 pb-2">
          <div className="overflow-x-auto">
            <Table className="min-w-[900px] text-xs md:text-sm">
              <TableHeader>
                <TableRow className="border-slate-800 bg-slate-900/60">
                  <TableHead className="text-slate-300 px-3 py-2">DA</TableHead>
                  <TableHead className="text-slate-300 px-3 py-2">Product</TableHead>
                  <TableHead className="text-slate-300 px-3 py-2">SKU</TableHead>
                  <TableHead className="text-slate-300 px-3 py-2 text-center">Assigned</TableHead>
                  <TableHead className="text-slate-300 px-3 py-2 text-center">Delivered</TableHead>
                  <TableHead className="text-slate-300 px-3 py-2 text-center">Payment <span className="align-middle">&#10003;</span></TableHead>
                  <TableHead className="text-slate-300 px-3 py-2 text-center">OTP <span className="align-middle">&#10003;</span></TableHead>
                  <TableHead className="text-slate-300 px-3 py-2 text-center">Counted as Sold</TableHead>
                  <TableHead className="text-slate-300 px-3 py-2 text-center">Bonus Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {skuTableData.map((item, idx) => (
                  <TableRow key={idx} className="border-slate-800 hover:bg-slate-800/40 transition-colors">
                    <TableCell className="text-white font-medium px-3 py-2">{item.da}</TableCell>
                    <TableCell className="text-slate-200 px-3 py-2">{item.product}</TableCell>
                    <TableCell className="text-slate-400 px-3 py-2">{item.sku}</TableCell>
                    <TableCell className="text-blue-400 px-3 py-2 text-center">{item.assigned}</TableCell>
                    <TableCell className="text-yellow-400 px-3 py-2 text-center">{item.delivered}</TableCell>
                    <TableCell className="text-center px-3 py-2">
                      {item.payment ? (
                        <CheckIcon className="inline h-5 w-5 text-green-400" strokeWidth={3} />
                      ) : (
                        <XIcon className="inline h-5 w-5 text-red-400" strokeWidth={3} />
                      )}
                    </TableCell>
                    <TableCell className="text-center px-3 py-2">
                      {item.otp ? (
                        <CheckIcon className="inline h-5 w-5 text-green-400" strokeWidth={3} />
                      ) : (
                        <XIcon className="inline h-5 w-5 text-red-400" strokeWidth={3} />
                      )}
                    </TableCell>
                    <TableCell className={cn("px-3 py-2 text-center font-semibold", item.countedAsSold > 0 ? "text-green-400" : "text-red-400")}>
                      {item.countedAsSold}
                    </TableCell>
                    <TableCell className="px-3 py-2 text-center">
                      {item.bonusStatus === "full" ? (
                        <Badge className="bg-green-500 text-white font-medium px-3 py-1 text-xs flex items-center gap-1">
                          <CheckIcon className="inline h-4 w-4 mr-1" strokeWidth={3} /> Full Bonus
                        </Badge>
                      ) : (
                        <Badge className="bg-red-500 text-white font-medium px-3 py-1 text-xs flex items-center gap-1">
                          <XIcon className="inline h-4 w-4 mr-1" strokeWidth={3} /> No Bonus
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Approvals Table */}
      <div className="hidden md:block">
        <DAApprovalTable deliveries={filteredDeliveries} />
      </div>

      {/* Mobile Cards for each delivery */}
      <div className="space-y-3 mt-3 md:hidden">
        {filteredDeliveries.length > 0 ? (
          filteredDeliveries.map((item) => (
            <DAApprovalMobileCard key={item.id} delivery={item} />
          ))
        ) : (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center text-slate-400">
              No records found.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DADeliveryApprovalTracker;

