
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle, XCircle, Clock, Phone, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OTPRequest {
  id: string;
  orderNo: string;
  daName: string;
  phoneNumber: string;
  otpCode: string;
  status: 'pending' | 'verified' | 'expired' | 'failed';
  expiresAt: Date;
  attempts: number;
  maxAttempts: number;
}

interface OTPVerificationProps {
  onVerificationComplete?: (orderNo: string) => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({
  onVerificationComplete
}) => {
  const [otpRequests, setOtpRequests] = useState<OTPRequest[]>([
    {
      id: '1',
      orderNo: 'ORD-2024-001',
      daName: 'Femi Adebayo',
      phoneNumber: '+234901234567',
      otpCode: '123456',
      status: 'verified',
      expiresAt: new Date(Date.now() + 300000), // 5 minutes
      attempts: 1,
      maxAttempts: 3
    },
    {
      id: '2',
      orderNo: 'ORD-2024-002', 
      daName: 'Tobi Johnson',
      phoneNumber: '+234901234568',
      otpCode: '789012',
      status: 'pending',
      expiresAt: new Date(Date.now() + 240000), // 4 minutes left
      attempts: 0,
      maxAttempts: 3
    }
  ]);

  const [newOTPRequest, setNewOTPRequest] = useState({
    orderNo: '',
    phoneNumber: ''
  });

  const [verificationCode, setVerificationCode] = useState('');
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

  const { toast } = useToast();

  // Update expired OTPs
  useEffect(() => {
    const interval = setInterval(() => {
      setOtpRequests(prev => 
        prev.map(request => {
          if (request.status === 'pending' && new Date() > request.expiresAt) {
            return { ...request, status: 'expired' as const };
          }
          return request;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSendOTP = async () => {
    if (!newOTPRequest.orderNo || !newOTPRequest.phoneNumber) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const otpCode = generateOTP();
    const newRequest: OTPRequest = {
      id: Date.now().toString(),
      orderNo: newOTPRequest.orderNo,
      daName: 'DA Name', // This would come from order lookup
      phoneNumber: newOTPRequest.phoneNumber,
      otpCode,
      status: 'pending',
      expiresAt: new Date(Date.now() + 300000), // 5 minutes
      attempts: 0,
      maxAttempts: 3
    };

    setOtpRequests(prev => [newRequest, ...prev]);
    setNewOTPRequest({ orderNo: '', phoneNumber: '' });

    console.log(`SMS API: Sending OTP ${otpCode} to ${newOTPRequest.phoneNumber} for order ${newOTPRequest.orderNo}`);

    toast({
      title: "OTP Sent",
      description: `Verification code sent to ${newOTPRequest.phoneNumber}`,
      variant: "default"
    });
  };

  const handleVerifyOTP = async () => {
    if (!selectedRequestId || !verificationCode) {
      toast({
        title: "Validation Error",
        description: "Please select a request and enter verification code",
        variant: "destructive"
      });
      return;
    }

    const request = otpRequests.find(r => r.id === selectedRequestId);
    if (!request) return;

    if (request.status !== 'pending') {
      toast({
        title: "Invalid Request",
        description: "This OTP request is no longer valid",
        variant: "destructive"
      });
      return;
    }

    if (new Date() > request.expiresAt) {
      setOtpRequests(prev => 
        prev.map(r => 
          r.id === selectedRequestId 
            ? { ...r, status: 'expired' as const }
            : r
        )
      );
      toast({
        title: "OTP Expired",
        description: "The verification code has expired",
        variant: "destructive"
      });
      return;
    }

    const isValidOTP = verificationCode === request.otpCode;
    const newAttempts = request.attempts + 1;

    if (isValidOTP) {
      setOtpRequests(prev => 
        prev.map(r => 
          r.id === selectedRequestId 
            ? { ...r, status: 'verified' as const, attempts: newAttempts }
            : r
        )
      );

      if (onVerificationComplete) {
        onVerificationComplete(request.orderNo);
      }

      toast({
        title: "Verification Successful",
        description: `OTP verified for order ${request.orderNo}`,
        variant: "default"
      });
    } else {
      const newStatus = newAttempts >= request.maxAttempts ? 'failed' : 'pending';
      
      setOtpRequests(prev => 
        prev.map(r => 
          r.id === selectedRequestId 
            ? { ...r, status: newStatus as const, attempts: newAttempts }
            : r
        )
      );

      toast({
        title: "Verification Failed",
        description: `Invalid OTP. ${request.maxAttempts - newAttempts} attempts remaining`,
        variant: "destructive"
      });
    }

    setVerificationCode('');
    setSelectedRequestId(null);
  };

  const handleResendOTP = (requestId: string) => {
    const newOtpCode = generateOTP();
    
    setOtpRequests(prev => 
      prev.map(r => 
        r.id === requestId 
          ? { 
              ...r, 
              otpCode: newOtpCode,
              status: 'pending' as const,
              expiresAt: new Date(Date.now() + 300000),
              attempts: 0
            }
          : r
      )
    );

    const request = otpRequests.find(r => r.id === requestId);
    if (request) {
      console.log(`SMS API: Resending OTP ${newOtpCode} to ${request.phoneNumber}`);
      toast({
        title: "OTP Resent",
        description: `New verification code sent to ${request.phoneNumber}`,
        variant: "default"
      });
    }
  };

  const getStatusIcon = (status: OTPRequest['status']) => {
    switch (status) {
      case 'verified': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-400" />;
      case 'expired': return <Clock className="h-4 w-4 text-orange-400" />;
      default: return <Shield className="h-4 w-4 text-blue-400" />;
    }
  };

  const getStatusColor = (status: OTPRequest['status']) => {
    switch (status) {
      case 'verified': return 'bg-green-500/20 text-green-400 border-green-500';
      case 'failed': return 'bg-red-500/20 text-red-400 border-red-500';
      case 'expired': return 'bg-orange-500/20 text-orange-400 border-orange-500';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500';
    }
  };

  const getTimeRemaining = (expiresAt: Date) => {
    const now = new Date();
    const diff = expiresAt.getTime() - now.getTime();
    if (diff <= 0) return 'Expired';
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-400" />
          OTP Delivery Verification
        </CardTitle>
        <p className="text-slate-400 text-sm">
          Send and verify OTP codes for delivery confirmation
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Send OTP Form */}
        <div className="bg-slate-700/30 rounded-lg p-4 space-y-4">
          <h3 className="text-white font-medium">Send OTP for Delivery</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Order Number"
              value={newOTPRequest.orderNo}
              onChange={(e) => setNewOTPRequest(prev => ({ ...prev, orderNo: e.target.value }))}
              className="bg-slate-600 border-slate-500 text-white"
            />
            <Input
              placeholder="Phone Number (+234...)"
              value={newOTPRequest.phoneNumber}
              onChange={(e) => setNewOTPRequest(prev => ({ ...prev, phoneNumber: e.target.value }))}
              className="bg-slate-600 border-slate-500 text-white"
            />
          </div>
          <Button 
            onClick={handleSendOTP}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Phone className="mr-2 h-4 w-4" />
            Send OTP
          </Button>
        </div>

        {/* Verify OTP Form */}
        <div className="bg-slate-700/30 rounded-lg p-4 space-y-4">
          <h3 className="text-white font-medium">Verify OTP</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={selectedRequestId || ''}
              onChange={(e) => setSelectedRequestId(e.target.value || null)}
              className="bg-slate-600 border border-slate-500 text-white rounded-md px-3 py-2"
            >
              <option value="">Select Order</option>
              {otpRequests.filter(r => r.status === 'pending').map(request => (
                <option key={request.id} value={request.id}>
                  {request.orderNo} - {request.phoneNumber}
                </option>
              ))}
            </select>
            <Input
              placeholder="Enter 6-digit OTP"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              maxLength={6}
              className="bg-slate-600 border-slate-500 text-white"
            />
          </div>
          <Button 
            onClick={handleVerifyOTP}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Verify OTP
          </Button>
        </div>

        {/* OTP Requests List */}
        <div className="space-y-4">
          <h3 className="text-white font-medium">OTP Requests</h3>
          {otpRequests.map((request) => (
            <div 
              key={request.id}
              className="bg-slate-700/30 rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                {getStatusIcon(request.status)}
                <div>
                  <p className="text-white font-medium">{request.orderNo}</p>
                  <p className="text-slate-400 text-sm">
                    {request.daName} • {request.phoneNumber}
                  </p>
                  <p className="text-slate-400 text-xs">
                    Attempts: {request.attempts}/{request.maxAttempts}
                  </p>
                </div>
              </div>
              <div className="text-right space-y-2">
                <Badge className={getStatusColor(request.status)}>
                  {request.status.toUpperCase()}
                </Badge>
                {request.status === 'pending' && (
                  <div>
                    <p className="text-slate-400 text-xs">
                      Expires: {getTimeRemaining(request.expiresAt)}
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleResendOTP(request.id)}
                      className="text-slate-300 border-slate-600 hover:bg-slate-700 mt-1"
                    >
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Resend
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-xs text-slate-400 mt-4">
          API: POST /api/sms/send-otp | GET /api/sms/verify-otp
        </div>
      </CardContent>
    </Card>
  );
};

export default OTPVerification;
