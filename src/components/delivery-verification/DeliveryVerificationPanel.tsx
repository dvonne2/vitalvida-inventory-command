
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, CreditCard, Phone, CheckCircle, Package } from 'lucide-react';
import MoniepointIntegration from '../payment/MoniepointIntegration';
import OTPVerification from '../verification/OTPVerification';
import { Badge } from '@/components/ui/badge';

interface DeliveryStatus {
  orderNo: string;
  paymentConfirmed: boolean;
  otpVerified: boolean;
  deliveryApproved: boolean;
  inventoryUpdated: boolean;
}

const DeliveryVerificationPanel = () => {
  const [deliveryStatuses, setDeliveryStatuses] = useState<DeliveryStatus[]>([
    {
      orderNo: 'ORD-2024-001',
      paymentConfirmed: true,
      otpVerified: true,
      deliveryApproved: true,
      inventoryUpdated: true
    },
    {
      orderNo: 'ORD-2024-002',
      paymentConfirmed: false,
      otpVerified: false,
      deliveryApproved: false,
      inventoryUpdated: false
    }
  ]);

  const handlePaymentConfirmed = (orderNo: string) => {
    setDeliveryStatuses(prev => 
      prev.map(status => 
        status.orderNo === orderNo 
          ? { ...status, paymentConfirmed: true }
          : status
      )
    );
    console.log(`Payment confirmed for ${orderNo} - updating inventory records`);
  };

  const handleOTPVerified = (orderNo: string) => {
    setDeliveryStatuses(prev => 
      prev.map(status => 
        status.orderNo === orderNo 
          ? { ...status, otpVerified: true }
          : status
      )
    );
    console.log(`OTP verified for ${orderNo} - customer received delivery`);
  };

  const getStepStatus = (completed: boolean) => {
    return completed 
      ? 'bg-green-500/20 text-green-400 border-green-500'
      : 'bg-gray-500/20 text-gray-400 border-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* Overview Header */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-400" />
            Delivery Verification Dashboard
          </CardTitle>
          <p className="text-slate-400 text-sm">
            Complete payment and OTP verification workflow for DA deliveries
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h3 className="text-white font-medium">Current Delivery Statuses</h3>
            {deliveryStatuses.map((status) => (
              <div key={status.orderNo} className="bg-slate-700/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-medium">{status.orderNo}</h4>
                  <div className="flex items-center gap-2">
                    {status.paymentConfirmed && status.otpVerified && status.deliveryApproved ? (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500">
                        COMPLETE
                      </Badge>
                    ) : (
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500">
                        IN PROGRESS
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <Badge className={getStepStatus(status.paymentConfirmed)}>
                      Payment {status.paymentConfirmed ? '✓' : '○'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <Badge className={getStepStatus(status.otpVerified)}>
                      OTP {status.otpVerified ? '✓' : '○'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <Badge className={getStepStatus(status.deliveryApproved)}>
                      Approval {status.deliveryApproved ? '✓' : '○'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    <Badge className={getStepStatus(status.inventoryUpdated)}>
                      Inventory {status.inventoryUpdated ? '✓' : '○'}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Verification Tools */}
      <Tabs defaultValue="payments" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 bg-slate-800/50 border border-slate-700">
          <TabsTrigger 
            value="payments" 
            className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Moniepoint Payments
          </TabsTrigger>
          <TabsTrigger 
            value="otp" 
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            <Phone className="h-4 w-4 mr-2" />
            OTP Verification
          </TabsTrigger>
        </TabsList>

        <TabsContent value="payments">
          <MoniepointIntegration onPaymentConfirmed={handlePaymentConfirmed} />
        </TabsContent>

        <TabsContent value="otp">
          <OTPVerification onVerificationComplete={handleOTPVerified} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DeliveryVerificationPanel;
