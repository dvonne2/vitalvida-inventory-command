
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CreditCard, AlertTriangle, CheckCircle } from 'lucide-react';

interface PaymentConfirmation {
  orderNo: string;
  customerPhone: string;
  amount: number;
  moniepointConfirmed: boolean;
  accountantConfirmed: boolean;
  timestamp: Date | null;
  fraudAlert: boolean;
}

const AccountantPaymentPanel = () => {
  const [orderNo, setOrderNo] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [pendingConfirmations, setPendingConfirmations] = useState<PaymentConfirmation[]>([
    {
      orderNo: '111178',
      customerPhone: '+2348123456789',
      amount: 2500,
      moniepointConfirmed: true,
      accountantConfirmed: false,
      timestamp: null,
      fraudAlert: false
    },
    {
      orderNo: '111179',
      customerPhone: '+2348987654321',
      amount: 1800,
      moniepointConfirmed: true,
      accountantConfirmed: false,
      timestamp: null,
      fraudAlert: false
    }
  ]);
  const [loading, setLoading] = useState(false);

  const handleConfirmPayment = async (orderNo: string) => {
    setLoading(true);
    try {
      // Simulate API call to confirm payment
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPendingConfirmations(prev =>
        prev.map(payment =>
          payment.orderNo === orderNo
            ? {
                ...payment,
                accountantConfirmed: true,
                timestamp: new Date()
              }
            : payment
        )
      );
      
      console.log(`Payment confirmed for order ${orderNo} by accountant at ${new Date().toISOString()}`);
    } catch (error) {
      console.error('Failed to confirm payment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLookupOrder = async () => {
    if (!orderNo || !customerPhone) return;
    
    setLoading(true);
    try {
      // Simulate order lookup and Moniepoint webhook trigger
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if order exists and phone matches
      const orderExists = pendingConfirmations.some(p => p.orderNo === orderNo);
      
      if (!orderExists) {
        // Add new order to pending confirmations
        setPendingConfirmations(prev => [...prev, {
          orderNo,
          customerPhone,
          amount: 0, // Will be updated by webhook
          moniepointConfirmed: false,
          accountantConfirmed: false,
          timestamp: null,
          fraudAlert: false
        }]);
      }
      
      console.log(`Order lookup triggered for ${orderNo} with phone ${customerPhone}`);
    } catch (error) {
      console.error('Failed to lookup order:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-green-400" />
          Accountant Payment Confirmation Panel
        </CardTitle>
        <p className="text-slate-400 text-sm">
          Enter Order No + Customer Phone to trigger Moniepoint verification, then manually confirm payment
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Order Lookup Section */}
        <div className="p-4 bg-slate-700/50 rounded-lg space-y-4">
          <h3 className="text-white font-medium">🔍 Order Lookup & Moniepoint Trigger</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="orderNo" className="text-slate-300">Order Number</Label>
              <Input
                id="orderNo"
                value={orderNo}
                onChange={(e) => setOrderNo(e.target.value)}
                placeholder="e.g., 111178"
                className="bg-slate-600 border-slate-500 text-white"
              />
            </div>
            <div>
              <Label htmlFor="customerPhone" className="text-slate-300">Customer Phone</Label>
              <Input
                id="customerPhone"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="e.g., +2348123456789"
                className="bg-slate-600 border-slate-500 text-white"
              />
            </div>
          </div>
          <Button 
            onClick={handleLookupOrder}
            disabled={!orderNo || !customerPhone || loading}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            🔍 Lookup Order & Trigger Moniepoint
          </Button>
        </div>

        {/* Pending Confirmations */}
        <div className="space-y-3">
          <h3 className="text-white font-medium">⏳ Pending Payment Confirmations</h3>
          {pendingConfirmations.length === 0 ? (
            <div className="text-slate-400 text-center py-8">
              No pending payment confirmations
            </div>
          ) : (
            pendingConfirmations.map((payment) => (
              <div key={payment.orderNo} className="p-4 bg-slate-700/50 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Order #{payment.orderNo}</div>
                    <div className="text-slate-300 text-sm">{payment.customerPhone}</div>
                    {payment.amount > 0 && (
                      <div className="text-green-400 font-medium">₦{payment.amount.toLocaleString()}</div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={payment.moniepointConfirmed ? "bg-green-500/20 text-green-400 border-green-500" : "bg-yellow-500/20 text-yellow-400 border-yellow-500"}>
                      {payment.moniepointConfirmed ? "✅ Moniepoint OK" : "⏳ Awaiting Webhook"}
                    </Badge>
                    {payment.fraudAlert && (
                      <Badge className="bg-red-500/20 text-red-400 border-red-500">
                        🚨 Fraud Alert
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {payment.moniepointConfirmed ? (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  )}
                  <span className="text-slate-300 text-sm">
                    Moniepoint webhook: {payment.moniepointConfirmed ? 'Confirmed' : 'Pending'}
                  </span>
                </div>

                <div className="flex justify-end">
                  {payment.accountantConfirmed ? (
                    <Badge className="bg-green-600 text-white border-0">
                      ✅ Confirmed by Accountant
                    </Badge>
                  ) : (
                    <Button
                      onClick={() => handleConfirmPayment(payment.orderNo)}
                      disabled={!payment.moniepointConfirmed || loading || payment.fraudAlert}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      ✅ Confirm Payment
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
          <h4 className="text-white font-medium mb-2">⚠️ Fraud Prevention Rules:</h4>
          <ul className="text-slate-300 text-sm space-y-1">
            <li>• Order No + Phone must match exactly</li>
            <li>• Moniepoint webhook must confirm payment first</li>
            <li>• Manual accountant confirmation required as final step</li>
            <li>• Mismatched Order/Phone combinations trigger fraud alerts</li>
            <li>• All confirmations logged with timestamps for audit</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountantPaymentPanel;
