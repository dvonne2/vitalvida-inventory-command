import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Package, CheckCircle, Clock, DollarSign, Phone, CreditCard, Eye } from 'lucide-react';
import OrderDrawer from './OrderDrawer';

interface OrderItem {
  id: string;
  name: string;
  quantityOrdered: number;
  quantityDelivered: number;
  unitPrice: number;
}

interface DetailedOrder {
  orderNo: string;
  customerName: string;
  daName: string;
  phoneNumber: string;
  items: OrderItem[];
  totalAmount: number;
  amountPaid: number;
  discount?: number;
  paymentStatus: 'pending' | 'confirmed' | 'failed';
  otpStatus: 'pending' | 'verified' | 'expired';
  deliveryStatus: 'processing' | 'delivered' | 'completed';
  orderDate: Date;
  deliveryDate?: Date;
  paymentMethod: string;
  moniepointRef?: string;
  paymentConfirmationTime?: Date;
  deliveryConfirmationTime?: Date;
  dispatchTime?: Date;
}

const DeliveryVerificationPanel = () => {
  const [selectedOrder, setSelectedOrder] = useState<DetailedOrder | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [orders] = useState<DetailedOrder[]>([
    {
      orderNo: 'ORD-2024-001',
      customerName: 'Mrs. Adebayo',
      daName: 'Femi Adebayo',
      phoneNumber: '+234901234567',
      items: [
        { id: '1', name: 'Fulani Shampoo', quantityOrdered: 5, quantityDelivered: 5, unitPrice: 2500 },
        { id: '2', name: 'Hair Pomade', quantityOrdered: 3, quantityDelivered: 3, unitPrice: 1500 },
        { id: '3', name: 'Conditioner', quantityOrdered: 2, quantityDelivered: 2, unitPrice: 3000 }
      ],
      totalAmount: 21500,
      amountPaid: 21500,
      discount: 0,
      paymentStatus: 'confirmed',
      otpStatus: 'verified',
      deliveryStatus: 'completed',
      orderDate: new Date('2024-01-15'),
      deliveryDate: new Date('2024-01-17'),
      paymentMethod: 'Bank Transfer',
      moniepointRef: 'MP-240117-001',
      paymentConfirmationTime: new Date('2024-01-16T10:30:00'),
      deliveryConfirmationTime: new Date('2024-01-17T14:45:00'),
      dispatchTime: new Date('2024-01-16T11:00:00')
    },
    {
      orderNo: 'ORD-2024-002',
      customerName: 'Mr. Johnson',
      daName: 'Tobi Johnson',
      phoneNumber: '+234901234568',
      items: [
        { id: '4', name: 'Hydration Tea', quantityOrdered: 10, quantityDelivered: 8, unitPrice: 1200 },
        { id: '5', name: 'Hair Pomade', quantityOrdered: 4, quantityDelivered: 4, unitPrice: 1500 }
      ],
      totalAmount: 18000,
      amountPaid: 16800,
      discount: 0,
      paymentStatus: 'confirmed',
      otpStatus: 'pending',
      deliveryStatus: 'processing',
      orderDate: new Date('2024-01-16'),
      paymentMethod: 'USSD',
      moniepointRef: 'MP-240117-002',
      paymentConfirmationTime: new Date('2024-01-16T15:20:00'),
      dispatchTime: new Date('2024-01-16T16:00:00')
    },
    {
      orderNo: 'ORD-2024-003',
      customerName: 'Miss Okafor',
      daName: 'Amaka Okafor',
      phoneNumber: '+234901234569',
      items: [
        { id: '6', name: 'Fulani Shampoo', quantityOrdered: 8, quantityDelivered: 0, unitPrice: 2500 },
        { id: '7', name: 'Conditioner', quantityOrdered: 5, quantityDelivered: 0, unitPrice: 3000 }
      ],
      totalAmount: 35000,
      amountPaid: 0,
      discount: 1500,
      paymentStatus: 'pending',
      otpStatus: 'pending',
      deliveryStatus: 'processing',
      orderDate: new Date('2024-01-18'),
      paymentMethod: 'Card Payment'
    }
  ]);

  const handleViewOrder = (order: DetailedOrder) => {
    setSelectedOrder(order);
    setIsDrawerOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
      case 'verified':
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500';
      case 'pending':
      case 'processing':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      case 'failed':
      case 'expired':
        return 'bg-red-500/20 text-red-400 border-red-500';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500';
    }
  };

  const getStatusIcon = (type: string, status: string) => {
    if (status === 'confirmed' || status === 'verified' || status === 'completed') {
      return <CheckCircle className="h-4 w-4 text-green-400" />;
    }
    if (type === 'payment') return <CreditCard className="h-4 w-4 text-yellow-400" />;
    if (type === 'otp') return <Phone className="h-4 w-4 text-yellow-400" />;
    return <Clock className="h-4 w-4 text-yellow-400" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-400" />
            Delivery Verification Dashboard
          </CardTitle>
          <p className="text-slate-400 text-sm">
            Automated payment and OTP verification with detailed order tracking
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-slate-400 text-sm">Total Orders</p>
                  <p className="text-xl font-bold text-white">{orders.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <div>
                  <p className="text-slate-400 text-sm">Completed</p>
                  <p className="text-xl font-bold text-white">
                    {orders.filter(o => o.deliveryStatus === 'completed').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-400" />
                <div>
                  <p className="text-slate-400 text-sm">Processing</p>
                  <p className="text-xl font-bold text-white">
                    {orders.filter(o => o.deliveryStatus === 'processing').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-400" />
                <div>
                  <p className="text-slate-400 text-sm">Revenue</p>
                  <p className="text-xl font-bold text-white">
                    ₦{orders.reduce((sum, o) => sum + o.amountPaid, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Orders List */}
      <div className="space-y-4">
        <h3 className="text-white font-medium text-lg">Order Details & Status</h3>
        {orders.map((order) => (
          <Card key={order.orderNo} className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white text-lg">{order.orderNo}</CardTitle>
                  <p className="text-slate-400 text-sm">
                    {order.customerName} • DA: {order.daName} • {order.phoneNumber}
                  </p>
                  <p className="text-slate-400 text-xs">
                    Ordered: {order.orderDate.toLocaleDateString()}
                    {order.deliveryDate && ` • Delivered: ${order.deliveryDate.toLocaleDateString()}`}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Badge className={getStatusColor(order.deliveryStatus)}>
                    {order.deliveryStatus.toUpperCase()}
                  </Badge>
                  <Button
                    size="sm"
                    onClick={() => handleViewOrder(order)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Payment & OTP Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-700/30 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon('payment', order.paymentStatus)}
                      <div>
                        <p className="text-white font-medium">Payment Status</p>
                        <p className="text-slate-400 text-sm">
                          {order.paymentMethod}
                          {order.moniepointRef && ` • ${order.moniepointRef}`}
                        </p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(order.paymentStatus)}>
                      {order.paymentStatus.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                
                <div className="bg-slate-700/30 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon('otp', order.otpStatus)}
                      <div>
                        <p className="text-white font-medium">OTP Verification</p>
                        <p className="text-slate-400 text-sm">Auto-verified by Laravel</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(order.otpStatus)}>
                      {order.otpStatus.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Quick Order Summary */}
              <div className="bg-slate-700/30 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-slate-400 text-sm">Items</p>
                    <p className="text-white font-medium">{order.items.length} products</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Total Value</p>
                    <p className="text-white font-medium">₦{order.totalAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Amount Paid</p>
                    <p className="text-green-400 font-medium">₦{order.amountPaid.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Order Drawer */}
      <OrderDrawer 
        order={selectedOrder}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      <div className="text-xs text-slate-400 mt-4">
        API: Automated Laravel validation • Real-time status updates via webhooks
      </div>
    </div>
  );
};

export default DeliveryVerificationPanel;
