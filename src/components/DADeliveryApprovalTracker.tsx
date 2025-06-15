
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { UserCheck, Users, Shield, CheckCircle, AlertTriangle, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import DAApprovalTable from "./DAApprovalTable";
import DAApprovalMobileCard from "./DAApprovalMobileCard";
import { getStatusBadge } from "./daApprovalUtils";

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
