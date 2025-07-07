
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CreditCard, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PaymentTransaction {
  id: string;
  orderNo: string;
  daName: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  moniepointRef: string;
  timestamp: Date;
  paymentMethod: string;
}

interface MoniepointIntegrationProps {
  onPaymentConfirmed?: (orderNo: string) => void;
}

const MoniepointIntegration: React.FC<MoniepointIntegrationProps> = ({
  onPaymentConfirmed
}) => {
  const [transactions, setTransactions] = useState<PaymentTransaction[]>([
    {
      id: '1',
      orderNo: 'ORD-2024-001',
      daName: 'Femi Adebayo',
      amount: 25000,
      status: 'completed',
      moniepointRef: 'MP-240117-001',
      timestamp: new Date(),
      paymentMethod: 'Bank Transfer'
    },
    {
      id: '2',
      orderNo: 'ORD-2024-002',
      daName: 'Tobi Johnson',
      amount: 18500,
      status: 'pending',
      moniepointRef: 'MP-240117-002',
      timestamp: new Date(),
      paymentMethod: 'USSD'
    }
  ]);

  const [newPayment, setNewPayment] = useState({
    orderNo: '',
    amount: '',
    paymentMethod: 'Bank Transfer'
  });

  const { toast } = useToast();

  const handleInitiatePayment = async () => {
    if (!newPayment.orderNo || !newPayment.amount) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const transaction: PaymentTransaction = {
      id: Date.now().toString(),
      orderNo: newPayment.orderNo,
      daName: 'DA Name', // This would come from order lookup
      amount: parseFloat(newPayment.amount),
      status: 'processing',
      moniepointRef: `MP-${Date.now()}`,
      timestamp: new Date(),
      paymentMethod: newPayment.paymentMethod
    };

    setTransactions(prev => [transaction, ...prev]);
    
    // Simulate payment processing
    setTimeout(() => {
      setTransactions(prev => 
        prev.map(t => 
          t.id === transaction.id 
            ? { ...t, status: 'completed' as const }
            : t
        )
      );
      
      if (onPaymentConfirmed) {
        onPaymentConfirmed(transaction.orderNo);
      }

      toast({
        title: "Payment Confirmed",
        description: `Payment for ${transaction.orderNo} has been processed successfully`,
        variant: "default"
      });
    }, 3000);

    setNewPayment({ orderNo: '', amount: '', paymentMethod: 'Bank Transfer' });
    
    toast({
      title: "Payment Initiated",
      description: "Payment is being processed via Moniepoint",
      variant: "default"
    });
  };

  const getStatusIcon = (status: PaymentTransaction['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-400" />;
      case 'processing': return <Clock className="h-4 w-4 text-yellow-400" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: PaymentTransaction['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500';
      case 'failed': return 'bg-red-500/20 text-red-400 border-red-500';
      case 'processing': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500';
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-green-400" />
          Moniepoint Payment Integration
        </CardTitle>
        <p className="text-slate-400 text-sm">
          Process and track payments for DA deliveries
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Payment Initiation Form */}
        <div className="bg-slate-700/30 rounded-lg p-4 space-y-4">
          <h3 className="text-white font-medium">Initiate New Payment</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Order Number"
              value={newPayment.orderNo}
              onChange={(e) => setNewPayment(prev => ({ ...prev, orderNo: e.target.value }))}
              className="bg-slate-600 border-slate-500 text-white"
            />
            <Input
              placeholder="Amount (₦)"
              type="number"
              value={newPayment.amount}
              onChange={(e) => setNewPayment(prev => ({ ...prev, amount: e.target.value }))}
              className="bg-slate-600 border-slate-500 text-white"
            />
            <select
              value={newPayment.paymentMethod}
              onChange={(e) => setNewPayment(prev => ({ ...prev, paymentMethod: e.target.value }))}
              className="bg-slate-600 border border-slate-500 text-white rounded-md px-3 py-2"
            >
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="USSD">USSD</option>
              <option value="Card">Card Payment</option>
              <option value="Mobile Money">Mobile Money</option>
            </select>
          </div>
          <Button 
            onClick={handleInitiatePayment}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Process Payment via Moniepoint
          </Button>
        </div>

        {/* Transaction History */}
        <div className="space-y-4">
          <h3 className="text-white font-medium">Recent Transactions</h3>
          {transactions.map((transaction) => (
            <div 
              key={transaction.id}
              className="bg-slate-700/30 rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                {getStatusIcon(transaction.status)}
                <div>
                  <p className="text-white font-medium">{transaction.orderNo}</p>
                  <p className="text-slate-400 text-sm">
                    {transaction.daName} • {transaction.paymentMethod}
                  </p>
                  <p className="text-slate-400 text-xs">
                    Ref: {transaction.moniepointRef}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">₦{transaction.amount.toLocaleString()}</p>
                <Badge className={getStatusColor(transaction.status)}>
                  {transaction.status.toUpperCase()}
                </Badge>
                <p className="text-slate-400 text-xs mt-1">
                  {transaction.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-xs text-slate-400 mt-4">
          API: POST /api/payments/moniepoint/initiate | Real-time webhook updates
        </div>
      </CardContent>
    </Card>
  );
};

export default MoniepointIntegration;
