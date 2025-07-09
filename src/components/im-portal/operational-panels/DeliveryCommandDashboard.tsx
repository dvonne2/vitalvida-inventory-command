import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Truck, MapPin, Clock, AlertTriangle, RefreshCw, Phone } from 'lucide-react';

const DeliveryCommandDashboard = () => {
  const [orderId, setOrderId] = useState('');
  const [deliveryData, setDeliveryData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState<string>('');

  const fetchDeliveryStatus = async () => {
    if (!orderId) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/delivery/status/${orderId}`);
      const data = await response.json();
      setDeliveryData(data);
    } catch (error) {
      console.error('Failed to fetch delivery status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (deliveryData?.eta) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const eta = new Date(deliveryData.eta).getTime();
        const distance = eta - now;

        if (distance > 0) {
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          setCountdown(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        } else {
          setCountdown('Delivered');
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [deliveryData?.eta]);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'bg-green-500/20 text-green-400 border-green-500';
      case 'in_transit': return 'bg-blue-500/20 text-blue-400 border-blue-500';
      case 'shipped': return 'bg-purple-500/20 text-purple-400 border-purple-500';
      case 'packed': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500';
    }
  };

  const statusHistory = [
    { status: 'ordered', time: '09:00 AM', completed: true },
    { status: 'packed', time: '10:30 AM', completed: true },
    { status: 'shipped', time: '11:15 AM', completed: true },
    { status: 'in_transit', time: '12:00 PM', completed: deliveryData?.status !== 'packed' },
    { status: 'delivered', time: 'Pending', completed: deliveryData?.status === 'delivered' }
  ];

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-3">
          <Truck className="h-6 w-6 text-cyan-400" />
          Delivery Command Dashboard
          <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500">
            Real-Time Tracking
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Order Search */}
        <div className="flex gap-2">
          <div className="flex-1">
            <Label className="text-slate-300">Order ID</Label>
            <Input
              placeholder="Enter order ID to track delivery..."
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="bg-slate-700/50 border-slate-600 text-white"
              onKeyDown={(e) => e.key === 'Enter' && fetchDeliveryStatus()}
            />
          </div>
          <div className="flex items-end gap-2">
            <Button
              onClick={fetchDeliveryStatus}
              disabled={!orderId || isLoading}
              className="bg-cyan-600 hover:bg-cyan-700"
            >
              {isLoading ? 'Tracking...' : 'Track Order'}
            </Button>
            {deliveryData && (
              <Button variant="outline" size="icon" className="border-slate-600">
                <RefreshCw className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Delivery Status */}
        {deliveryData && (
          <div className="space-y-6">
            {/* Status Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-slate-700/30 border-slate-600">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Status</p>
                      <Badge className={getStatusColor(deliveryData.status)}>
                        {deliveryData.status?.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                    <Truck className="h-8 w-8 text-cyan-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-700/30 border-slate-600">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Location</p>
                      <p className="text-white font-medium">{deliveryData.location}</p>
                    </div>
                    <MapPin className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-700/30 border-slate-600">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">ETA</p>
                      <p className="text-white font-medium font-mono">{countdown}</p>
                    </div>
                    <Clock className="h-8 w-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Delivery Progress</span>
                <span className="text-cyan-400 font-medium">{deliveryData.progress}%</span>
              </div>
              <Progress value={deliveryData.progress} className="h-3" />
            </div>

            {/* Status History */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="history" className="border-slate-600">
                <AccordionTrigger className="text-white hover:text-cyan-400">
                  Delivery Timeline
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pt-2">
                    {statusHistory.map((step, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${step.completed ? 'bg-green-400' : 'bg-slate-600'}`}></div>
                          <span className={`font-medium ${step.completed ? 'text-white' : 'text-slate-400'}`}>
                            {step.status.charAt(0).toUpperCase() + step.status.slice(1).replace('_', ' ')}
                          </span>
                        </div>
                        <span className={`text-sm ${step.completed ? 'text-green-400' : 'text-slate-400'}`}>
                          {step.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Emergency Actions */}
            {deliveryData.status === 'in_transit' && (
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 border-yellow-500 text-yellow-400 hover:bg-yellow-500/20">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Report Delay
                </Button>
                <Button variant="outline" className="flex-1 border-red-500 text-red-400 hover:bg-red-500/20">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Driver
                </Button>
              </div>
            )}
          </div>
        )}

        {/* No Data State */}
        {!deliveryData && !isLoading && orderId && (
          <div className="p-4 bg-yellow-500/20 border border-yellow-500 rounded-lg">
            <p className="text-yellow-400">Delivery information not found for this order.</p>
            <p className="text-yellow-300 text-sm mt-1">Please verify the order ID or contact support.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DeliveryCommandDashboard;