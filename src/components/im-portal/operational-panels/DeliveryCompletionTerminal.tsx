import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle, Clock, RotateCcw, Phone } from 'lucide-react';

const DeliveryCompletionTerminal = () => {
  const [orderId, setOrderId] = useState('');
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [countdown, setCountdown] = useState(300); // 5 minutes

  const verifyOtp = async () => {
    setIsVerifying(true);
    try {
      const response = await fetch('/api/delivery/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: orderId, otp: otp })
      });
      const data = await response.json();
      setVerificationResult(data);
    } catch (error) {
      console.error('OTP verification failed:', error);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-3">
          <Shield className="h-6 w-6 text-blue-400" />
          Delivery Completion Terminal
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500">
            OTP Verification
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Order Input */}
        <div>
          <Label className="text-slate-300">Order ID</Label>
          <Input
            placeholder="ORD-12345"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="bg-slate-700/50 border-slate-600 text-white"
          />
        </div>

        {/* OTP Input */}
        <div>
          <Label className="text-slate-300">Delivery OTP</Label>
          <Input
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            className="bg-slate-700/50 border-slate-600 text-white text-center text-2xl font-mono tracking-widest"
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-slate-400 text-sm">OTP expires in: {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}</span>
            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
              <RotateCcw className="h-3 w-3 mr-1" />
              Resend OTP
            </Button>
          </div>
        </div>

        {/* Verify Button */}
        <Button
          onClick={verifyOtp}
          disabled={!orderId || otp.length !== 6 || isVerifying}
          className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700"
        >
          {isVerifying ? 'Verifying...' : 'Complete Delivery'}
        </Button>

        {/* Emergency Options */}
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 border-yellow-500 text-yellow-400">
            Customer Not Available
          </Button>
          <Button variant="outline" className="flex-1 border-red-500 text-red-400">
            <Phone className="h-4 w-4 mr-2" />
            Contact Support
          </Button>
        </div>

        {/* Success State */}
        {verificationResult?.verified && (
          <div className="p-6 bg-green-500/20 border border-green-500 rounded-lg text-center">
            <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-green-400 text-xl font-bold mb-2">🎉 Delivery Completed!</h3>
            <p className="text-green-300">
              Order {orderId} delivered successfully at {new Date(verificationResult.completion_time).toLocaleString()}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DeliveryCompletionTerminal;