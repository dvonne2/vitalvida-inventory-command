
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { DeliveryOrder } from './types';
import { formatTimeRemaining } from './utils';
import VerificationIcon from './VerificationIcon';
import BonusStatus from './BonusStatus';
import ApprovalButton from './ApprovalButton';

interface DeliveryOrderRowProps {
  order: DeliveryOrder;
  userRole: string;
  loading: boolean;
  onApprove: (orderNo: string) => void;
}

const DeliveryOrderRow = ({ order, userRole, loading, onApprove }: DeliveryOrderRowProps) => {
  return (
    <TableRow 
      key={order.orderNo} 
      className={`border-slate-600 hover:bg-slate-700/50 ${
        order.approved ? 'bg-green-900/20' : order.fraudAlert ? 'bg-red-900/20' : ''
      }`}
    >
      <TableCell className="text-white font-mono font-medium">{order.orderNo}</TableCell>
      <TableCell className="text-white font-medium">{order.da}</TableCell>
      <TableCell className="text-slate-300">{order.product}</TableCell>
      <TableCell className="text-slate-400 font-mono text-xs">
        {order.sku.slice(-6)}...
      </TableCell>
      <TableCell className="text-blue-400 font-medium">{order.assigned}</TableCell>
      <TableCell className="text-yellow-400 font-medium">{order.delivered}</TableCell>
      <TableCell className="text-center">
        <VerificationIcon verified={order.paymentVerified} />
      </TableCell>
      <TableCell className="text-center">
        <VerificationIcon verified={order.otpSubmitted} />
      </TableCell>
      <TableCell className="text-center">
        <VerificationIcon verified={order.telesalesConfirmed} />
      </TableCell>
      <TableCell className="text-center">
        <span className={`font-bold ${order.countedAsSold > 0 ? 'text-green-400' : 'text-red-400'}`}>
          {order.countedAsSold}
        </span>
      </TableCell>
      <TableCell>
        <BonusStatus 
          eligible={order.bonusEligible} 
          delivered={order.delivered} 
          approved={order.approved} 
        />
      </TableCell>
      <TableCell className="text-center">
        {order.timerStarted ? formatTimeRemaining(order.timeRemaining) : (
          <span className="text-gray-400">Not Started</span>
        )}
      </TableCell>
      <TableCell>
        <ApprovalButton 
          order={order} 
          userRole={userRole} 
          loading={loading} 
          onApprove={onApprove} 
        />
      </TableCell>
    </TableRow>
  );
};

export default DeliveryOrderRow;
