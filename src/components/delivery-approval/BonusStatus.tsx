
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface BonusStatusProps {
  eligible: number;
  delivered: number;
  approved: boolean;
}

const BonusStatus = ({ eligible, delivered, approved }: BonusStatusProps) => {
  if (!approved) {
    return <Badge className="bg-gray-500 text-white border-0">⏳ Pending</Badge>;
  }
  if (eligible === delivered && delivered > 0) {
    return <Badge className="bg-green-500 text-white border-0">✅ Full Bonus</Badge>;
  } else if (eligible > 0) {
    return <Badge className="bg-yellow-500 text-white border-0">⚠️ Partial</Badge>;
  } else {
    return <Badge className="bg-red-500 text-white border-0">❌ No Bonus</Badge>;
  }
};

export default BonusStatus;
