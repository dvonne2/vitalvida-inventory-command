
import React from "react";
import { Badge } from "@/components/ui/badge";

export const getStatusBadge = (status: string) => {
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
