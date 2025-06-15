
// --- Fully adapted from DAStockSoldTracker, now with "Delivery Approval Tracker" focus ---

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Lock, Shield } from 'lucide-react';

// Type matches original DAStockSoldTracker workflow (approval, penalty, bonus, fraud)
interface DeliveryOrder {
  orderNo: string;
  da: string;
  product: string;
  sku: string;
  assigned: number;
  delivered: number;
  paymentVerified: boolean;
  otpSubmitted: boolean;
  telesalesConfirmed: boolean;
  countedAsSold: number;
  bonusEligible: number;
  timerStarted: Date | null;
  timeRemaining: number; // hours
  approved: boolean;
  approvedBy: string | null;
  approvedAt: Date | null;
  penaltyApplied: boolean;
  fraudAlert: boolean;
}

interface DADeliveryApprovalTrackerProps {
  userRole: 'inventory_manager' | 'accountant' | 'telesales' | 'admin';
  userId: string;
}

const DADeliveryApprovalTracker = ({ userRole, userId }: DADeliveryApprovalTrackerProps) => {
  const [orders, setOrders] = useState<DeliveryOrder[]>([]);
  const [loading, setLoading] = useState(false);

  // Mock data from DAStockSoldTracker; in real use, replace with backend call
  useEffect(() => {
    const mockOrders: DeliveryOrder[] = [
      {
        orderNo: '111178',
        da: 'Femi',
        product: 'Shampoo',
        sku: '5497539000000484113',
        assigned: 10,
        delivered: 10,
        paymentVerified: true,
        otpSubmitted: true,
        telesalesConfirmed: true,
        countedAsSold: 10,
        bonusEligible: 10,
        timerStarted: new Date(Date.now() - 14 * 60 * 60 * 1000),
        timeRemaining: 4.35,
        approved: false,
        approvedBy: null,
        approvedAt: null,
        penaltyApplied: false,
        fraudAlert: false
      },
      {
        orderNo: '111179',
        da: 'Femi',
        product: 'Pomade',
        sku: '5497539000000483026',
        assigned: 6,
        delivered: 6,
        paymentVerified: false,
        otpSubmitted: true,
        telesalesConfirmed: false,
        countedAsSold: 0,
        bonusEligible: 0,
        timerStarted: new Date(Date.now() - 5.5 * 60 * 60 * 1000),
        timeRemaining: 12.5,
        approved: false,
        approvedBy: null,
        approvedAt: null,
        penaltyApplied: false,
        fraudAlert: false
      },
      {
        orderNo: '111180',
        da: 'Tobi',
        product: 'Conditioner',
        sku: '5497539000000483001',
        assigned: 4,
        delivered: 4,
        paymentVerified: true,
        otpSubmitted: true,
        telesalesConfirmed: true,
        countedAsSold: 4,
        bonusEligible: 4,
        timerStarted: new Date(Date.now() - 19 * 60 * 60 * 1000),
        timeRemaining: -1,
        approved: false,
        approvedBy: null,
        approvedAt: null,
        penaltyApplied: true,
        fraudAlert: false
      }
    ];
    setOrders(mockOrders);
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

  const canApproveDelivery = (order: DeliveryOrder) => {
    return (
      userRole === 'inventory_manager' &&
      order.paymentVerified &&
      order.otpSubmitted &&
      order.telesalesConfirmed &&
      !order.approved &&
      !order.fraudAlert &&
      order.timeRemaining > 0
    );
  };

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

  const getVerificationIcon = (verified: boolean) => {
    return verified ? (
      <CheckCircle className="h-4 w-4 text-green-400" />
    ) : (
      <XCircle className="h-4 w-4 text-red-400" />
    );
  };

  const getBonusStatus = (eligible: number, delivered: number, approved: boolean) => {
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

  const formatTimeRemaining = (hours: number) => {
    if (hours <= 0) {
      return <span className="text-red-500 font-bold">⛔ Overdue</span>;
    }
    const h = Math.floor(hours);
    const m = Math.floor((hours - h) * 60);
    if (hours < 2) {
      return <span className="text-red-400 font-bold">{h}h {m}m left</span>;
    } else if (hours < 6) {
      return <span className="text-yellow-400 font-bold">{h}h {m}m left</span>;
    } else {
      return <span className="text-green-400 font-bold">{h}h {m}m left</span>;
    }
  };

  const getApprovalButton = (order: DeliveryOrder) => {
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
    if (!canApproveDelivery(order)) {
      return (
        <Button disabled size="sm" className="bg-gray-600 text-gray-300">
          <Lock className="h-3 w-3 mr-1" />
          Disabled
        </Button>
      );
    }
    return (
      <Button
        onClick={() => handleApproveDelivery(order.orderNo)}
        disabled={loading}
        size="sm"
        className="bg-green-600 hover:bg-green-700 text-white"
      >
        ✅ Approve Delivery
      </Button>
    );
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-400" />
          Delivery Approval Tracker (This Week) — Approval Required to Finalize Delivery
          <Badge className={`ml-2 ${userRole === "inventory_manager" ? "bg-blue-500/20 text-blue-400 border-blue-500" : userRole === "accountant" ? "bg-green-500/20 text-green-400 border-green-500" : userRole === "telesales" ? "bg-purple-500/20 text-purple-400 border-purple-500" : "bg-red-500/20 text-red-400 border-red-500"}`}>
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
                <TableRow key={order.orderNo} className={`border-slate-600 hover:bg-slate-700/50 ${order.approved ? 'bg-green-900/20' : order.fraudAlert ? 'bg-red-900/20' : ''}`}>
                  <TableCell className="text-white font-mono font-medium">{order.orderNo}</TableCell>
                  <TableCell className="text-white font-medium">{order.da}</TableCell>
                  <TableCell className="text-slate-300">{order.product}</TableCell>
                  <TableCell className="text-slate-400 font-mono text-xs">
                    {order.sku.slice(-6)}...
                  </TableCell>
                  <TableCell className="text-blue-400 font-medium">{order.assigned}</TableCell>
                  <TableCell className="text-yellow-400 font-medium">{order.delivered}</TableCell>
                  <TableCell className="text-center">
                    {getVerificationIcon(order.paymentVerified)}
                  </TableCell>
                  <TableCell className="text-center">
                    {getVerificationIcon(order.otpSubmitted)}
                  </TableCell>
                  <TableCell className="text-center">
                    {getVerificationIcon(order.telesalesConfirmed)}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`font-bold ${order.countedAsSold > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {order.countedAsSold}
                    </span>
                  </TableCell>
                  <TableCell>
                    {getBonusStatus(order.bonusEligible, order.delivered, order.approved)}
                  </TableCell>
                  <TableCell className="text-center">
                    {order.timerStarted ? formatTimeRemaining(order.timeRemaining) : (
                      <span className="text-gray-400">Not Started</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {getApprovalButton(order)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
          <h4 className="text-white font-medium mb-2">🔐 Approval Workflow Requirements:</h4>
          <ul className="text-slate-300 text-sm space-y-1">
            <li>• OTP verification required from DA</li>
            <li>• Telesales confirmation required</li>
            <li>• Payment confirmation via Moniepoint webhook + accountant approval</li>
            <li>• 18-hour SLA for Inventory Manager approval (₦2,000 penalty if overdue)</li>
            <li>• Role separation enforced - only Inventory Manager can approve deliveries</li>
            <li>• All actions logged with timestamps for audit trail</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default DADeliveryApprovalTracker;
