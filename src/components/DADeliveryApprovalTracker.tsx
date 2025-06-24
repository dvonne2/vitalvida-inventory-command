
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';
import { DeliveryOrder, DADeliveryApprovalTrackerProps } from './delivery-approval/types';
import { getMockOrders } from './delivery-approval/utils';
import DeliveryOrderRow from './delivery-approval/DeliveryOrderRow';
import WorkflowRequirements from './delivery-approval/WorkflowRequirements';

const DADeliveryApprovalTracker = ({ userRole, userId }: DADeliveryApprovalTrackerProps) => {
  const [orders, setOrders] = useState<DeliveryOrder[]>([]);
  const [loading, setLoading] = useState(false);

  // Mock data; in real use, replace with backend call
  useEffect(() => {
    setOrders(getMockOrders());
  }, []);

  // Timer logic; penalty if overdue, updates timeRemaining
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(prevOrders =>
        prevOrders.map(order => {
          if (!order.timerStarted || order.approved) return order;
          const elapsed = (Date.now() - order.timerStarted.getTime()) / (1000 * 60 * 60);
          const remaining = 18 - elapsed;
          if (remaining <= 0 && !order.penaltyApplied) {
            console.log(`Penalty applied to order ${order.orderNo}: ₦2,000 deduction`);
            return { ...order, timeRemaining: remaining, penaltyApplied: true };
          }
          return { ...order, timeRemaining: remaining };
        })
      );
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleApproveDelivery = async (orderNo: string) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.orderNo === orderNo
            ? {
                ...order,
                approved: true,
                approvedBy: userId,
                approvedAt: new Date()
              }
            : order
        )
      );
      console.log(`Order ${orderNo} delivery approved by ${userId} at ${new Date().toISOString()}`);
    } catch (error) {
      console.error('Failed to approve delivery:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'inventory_manager': return 'bg-blue-500/20 text-blue-400 border-blue-500';
      case 'accountant': return 'bg-green-500/20 text-green-400 border-green-500';
      case 'telesales': return 'bg-purple-500/20 text-purple-400 border-purple-500';
      case 'admin': return 'bg-red-500/20 text-red-400 border-red-500';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500';
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-400" />
          Delivery Approval Tracker (This Week) — Approval Required to Finalize Delivery
          <Badge className={`ml-2 ${getRoleColor(userRole)}`}>
            Role: {userRole.replace('_', ' ').toUpperCase()}
          </Badge>
        </CardTitle>
        <p className="text-slate-400 text-sm">
          Inventory Manager must approve deliveries after OTP + Telesales + Payment confirmations (18hr SLA)
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-600">
                <TableHead className="text-slate-300">Order No</TableHead>
                <TableHead className="text-slate-300">DA</TableHead>
                <TableHead className="text-slate-300">Product</TableHead>
                <TableHead className="text-slate-300">SKU</TableHead>
                <TableHead className="text-slate-300">Assigned</TableHead>
                <TableHead className="text-slate-300">Delivered</TableHead>
                <TableHead className="text-slate-300">Payment ✓</TableHead>
                <TableHead className="text-slate-300">OTP ✓</TableHead>
                <TableHead className="text-slate-300">Telesales ✓</TableHead>
                <TableHead className="text-slate-300">Counted as Delivered</TableHead>
                <TableHead className="text-slate-300">Bonus Status</TableHead>
                <TableHead className="text-slate-300">⏱ Timer</TableHead>
                <TableHead className="text-slate-300">✅ Approve Delivery</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <DeliveryOrderRow
                  key={order.orderNo}
                  order={order}
                  userRole={userRole}
                  loading={loading}
                  onApprove={handleApproveDelivery}
                />
              ))}
            </TableBody>
          </Table>
        </div>
        
        <WorkflowRequirements />
      </CardContent>
    </Card>
  );
};

export default DADeliveryApprovalTracker;
