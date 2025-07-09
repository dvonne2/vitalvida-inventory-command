import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Check, Scan, Shield, CreditCard, Package } from 'lucide-react';

const OrderProcessingCommandCenter = () => {
  const [orderId, setOrderId] = useState('');
  const [otp, setOtp] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'confirmed' | 'failed'>('pending');
  const [processStep, setProcessStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const steps = [
    { label: 'Payment', icon: CreditCard, status: paymentStatus === 'confirmed' ? 'complete' : 'pending' },
    { label: 'OTP', icon: Shield, status: otp.length === 6 ? 'complete' : 'pending' },
    { label: 'Inventory', icon: Package, status: processStep >= 2 ? 'complete' : 'pending' },
    { label: 'Complete', icon: Check, status: processStep >= 3 ? 'complete' : 'pending' }
  ];

  const handleExecuteDeduction = async () => {
    setIsProcessing(true);
    try {
      // API call to deductInventory
      const response = await fetch('/api/inventory/deduct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_id: orderId,
          otp: otp,
          payment_confirmed: paymentStatus === 'confirmed'
        })
      });
      
      if (response.ok) {
        setProcessStep(3);
      }
    } catch (error) {
      console.error('Deduction failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <Package className="h-6 w-6 text-blue-400" />
            Order Processing Command Center
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500">
              Live Processing
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress Stepper */}
          <div className="grid grid-cols-4 gap-4">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`p-3 rounded-full ${step.status === 'complete' ? 'bg-green-500/20 border-green-500' : 'bg-slate-700/50 border-slate-600'} border-2`}>
                  <step.icon className={`h-5 w-5 ${step.status === 'complete' ? 'text-green-400' : 'text-slate-400'}`} />
                </div>
                <span className={`text-sm mt-2 ${step.status === 'complete' ? 'text-green-400' : 'text-slate-400'}`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          <Progress value={(processStep / 3) * 100} className="h-2" />

          {/* Order ID Input */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Order ID</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="ORD-12345"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
                <Button variant="outline" size="icon" className="border-slate-600">
                  <Scan className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* OTP Verification */}
            <div className="space-y-2">
              <Label className="text-slate-300">OTP Verification</Label>
              <Input
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="bg-slate-700/50 border-slate-600 text-white text-center text-lg font-mono"
              />
            </div>
          </div>

          {/* Payment Status */}
          <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-blue-400" />
              <span className="text-white font-medium">Payment Status</span>
            </div>
            <Badge className={
              paymentStatus === 'confirmed' ? 'bg-green-500/20 text-green-400 border-green-500' :
              paymentStatus === 'failed' ? 'bg-red-500/20 text-red-400 border-red-500' :
              'bg-yellow-500/20 text-yellow-400 border-yellow-500'
            }>
              {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
            </Badge>
          </div>

          {/* Execute Button */}
          <Button
            onClick={handleExecuteDeduction}
            disabled={!orderId || otp.length !== 6 || paymentStatus !== 'confirmed' || isProcessing}
            className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700"
          >
            {isProcessing ? 'Processing...' : 'Execute Inventory Deduction'}
          </Button>

          {/* Success State */}
          {processStep >= 3 && (
            <div className="p-4 bg-green-500/20 border border-green-500 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Check className="h-5 w-5 text-green-400" />
                <span className="text-green-400 font-medium">Deduction Completed Successfully</span>
              </div>
              <div className="text-sm text-green-300">
                Transaction ID: TXN-{Date.now()}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderProcessingCommandCenter;