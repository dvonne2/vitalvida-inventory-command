import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { FileText, MapPin, Phone, Package } from 'lucide-react';

const DeliveryOrderIntelligencePanel = () => {
  const [orderId, setOrderId] = useState('');
  const [orderInfo, setOrderInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrderInfo = async () => {
    if (!orderId) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/delivery/orders/${orderId}/info`);
      const data = await response.json();
      setOrderInfo(data);
    } catch (error) {
      console.error('Failed to fetch order info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-3">
          <FileText className="h-6 w-6 text-purple-400" />
          Delivery Order Intelligence Panel
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500">
            Order Context
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Order Search */}
        <div className="flex gap-2">
          <div className="flex-1">
            <Label className="text-slate-300">Order ID</Label>
            <Input
              placeholder="Enter order ID for delivery context..."
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="bg-slate-700/50 border-slate-600 text-white"
              onKeyDown={(e) => e.key === 'Enter' && fetchOrderInfo()}
            />
          </div>
          <div className="flex items-end">
            <Button
              onClick={fetchOrderInfo}
              disabled={!orderId || isLoading}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isLoading ? 'Loading...' : 'Get Order Info'}
            </Button>
          </div>
        </div>

        {/* Order Information */}
        {orderInfo && (
          <div className="space-y-4">
            {/* Customer Info */}
            <Card className="bg-slate-700/30 border-slate-600">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>{orderInfo.customer?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-white font-medium">{orderInfo.customer}</h3>
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <Phone className="h-3 w-3" />
                      <span>{orderInfo.phone || '+234-XXX-XXX-XXXX'}</span>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500">
                    ₦{orderInfo.total?.toLocaleString()}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Address */}
            <Card className="bg-slate-700/30 border-slate-600">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-blue-400 mt-1" />
                  <div className="flex-1">
                    <h4 className="text-white font-medium mb-1">Delivery Address</h4>
                    <p className="text-slate-300">{orderInfo.delivery_address}</p>
                    {orderInfo.special_instructions && (
                      <div className="mt-2 p-2 bg-yellow-500/20 border border-yellow-500 rounded">
                        <p className="text-yellow-300 text-sm">
                          <strong>Special Instructions:</strong> {orderInfo.special_instructions}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Items Checklist */}
            <Card className="bg-slate-700/30 border-slate-600">
              <CardContent className="p-4">
                <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                  <Package className="h-5 w-5 text-green-400" />
                  Items to Deliver ({orderInfo.items?.length})
                </h4>
                <div className="space-y-2">
                  {orderInfo.items?.map((item: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-600 rounded flex items-center justify-center">
                          📦
                        </div>
                        <div>
                          <span className="text-white font-medium">{item.name}</span>
                          <p className="text-slate-400 text-sm">SKU: {item.sku}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-slate-500 text-slate-300">
                        Qty: {item.quantity}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Signature Capture */}
            <Card className="bg-slate-700/30 border-slate-600">
              <CardContent className="p-4">
                <h4 className="text-white font-medium mb-3">Customer Signature</h4>
                <div className="h-32 border-2 border-dashed border-slate-600 rounded-lg flex items-center justify-center">
                  <p className="text-slate-400">✍️ Tap here to capture signature</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* No Data State */}
        {!orderInfo && !isLoading && orderId && (
          <div className="p-4 bg-yellow-500/20 border border-yellow-500 rounded-lg">
            <p className="text-yellow-400">Order information not available.</p>
            <p className="text-yellow-300 text-sm mt-1">Please verify the order ID or contact support.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DeliveryOrderIntelligencePanel;