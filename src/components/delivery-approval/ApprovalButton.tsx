
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import { DeliveryOrder } from './types';
import { canApproveDelivery } from './utils';

interface ApprovalButtonProps {
  order: DeliveryOrder;
  userRole: string;
  loading: boolean;
  onApprove: (orderNo: string) => void;
}

const ApprovalButton = ({ order, userRole, loading, onApprove }: ApprovalButtonProps) => {
  if (order.approved) {
    return (
      <Badge className="bg-green-600 text-white border-0">
        ✅ Approved
      </Badge>
    );
  }
  if (order.timeRemaining <= 0) {
    return (
      <Badge className="bg-red-600 text-white border-0">
        ⛔ Approval Overdue
      </Badge>
    );
  }
  if (order.fraudAlert) {
    return (
      <Badge className="bg-red-600 text-white border-0">
        🚨 Fraud Alert
      </Badge>
    );
  }
  if (userRole !== 'inventory_manager') {
    return (
      <Badge className="bg-gray-500 text-white border-0">
        🔒 Inventory Only
      </Badge>
    );
  }
  if (!canApproveDelivery(order, userRole)) {
    return (
      <Button disabled size="sm" className="bg-gray-600 text-gray-300">
        <Lock className="h-3 w-3 mr-1" />
        Disabled
      </Button>
    );
  }
  return (
    <Button
      onClick={() => onApprove(order.orderNo)}
      disabled={loading}
      size="sm"
      className="bg-green-600 hover:bg-green-700 text-white"
    >
      ✅ Approve Delivery
    </Button>
  );
};

export default ApprovalButton;
