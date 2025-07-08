
import React from 'react';
import { 
  Drawer, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerClose 
} from '@/components/ui/drawer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { X, CheckCircle, AlertTriangle, XCircle, Clock } from 'lucide-react';

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

interface OrderDrawerProps {
  order: DetailedOrder | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDrawer: React.FC<OrderDrawerProps> = ({ order, isOpen, onClose }) => {
  if (!order) return null;

  // Calculate subtotal
  const subtotal = order.items.reduce((sum, item) => sum + (item.quantityDelivered * item.unitPrice), 0);
  
  // Calculate discount
  const discount = order.discount || 0;
  
  // Payment match check
  const expectedTotal = subtotal - discount;
  const paymentMatch = order.amountPaid === expectedTotal;

  // SLA Compliance Calculation
  const getSLAInfo = () => {
    if (!order.dispatchTime || !order.deliveryConfirmationTime) {
      return { duration: 0, status: 'Unknown', hours: 0 };
    }
    
    const diffMs = order.deliveryConfirmationTime.getTime() - order.dispatchTime.getTime();
    const hours = Math.round(diffMs / (1000 * 60 * 60));
    const status = hours <= 48 ? 'On Time' : 'Late';
    
    return { duration: diffMs, status, hours };
  };

  const slaInfo = getSLAInfo();

  // Final Order Status Logic
  const getFinalOrderStatus = () => {
    const quantityMatch = order.items.every(item => item.quantityOrdered === item.quantityDelivered);
    const partialDelivery = order.items.some(item => item.quantityDelivered > 0 && item.quantityDelivered < item.quantityOrdered);
    const paymentConfirmed = order.paymentStatus === 'confirmed';
    const otpVerified = order.otpStatus === 'verified';

    if (quantityMatch && paymentConfirmed && otpVerified) {
      return { status: 'Complete', icon: CheckCircle, color: 'text-green-400', bgColor: 'bg-green-500/20 border-green-500' };
    } else if (partialDelivery || (!paymentConfirmed && order.amountPaid > 0) || (otpVerified && !quantityMatch)) {
      return { status: 'Partial', icon: AlertTriangle, color: 'text-yellow-400', bgColor: 'bg-yellow-500/20 border-yellow-500' };
    } else {
      return { status: 'Flagged', icon: XCircle, color: 'text-red-400', bgColor: 'bg-red-500/20 border-red-500' };
    }
  };

  const finalStatus = getFinalOrderStatus();
  const StatusIcon = finalStatus.icon;

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="bg-slate-800 border-slate-700 max-h-[90vh]">
        <DrawerHeader className="border-b border-slate-700">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-white text-xl">
              Order Details - {order.orderNo}
            </DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </div>
          <div className="text-slate-400 text-sm">
            {order.customerName} • DA: {order.daName} • {order.phoneNumber}
          </div>
        </DrawerHeader>

        <div className="p-6 overflow-y-auto space-y-6">
          {/* Final Order Status */}
          <div className="flex items-center justify-center">
            <Badge className={`${finalStatus.bgColor} text-lg py-2 px-4 flex items-center gap-2`}>
              <StatusIcon className={`h-5 w-5 ${finalStatus.color}`} />
              {finalStatus.status}
            </Badge>
          </div>

          {/* Payment & OTP Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className={`h-4 w-4 ${order.paymentStatus === 'confirmed' ? 'text-green-400' : 'text-yellow-400'}`} />
                <span className="text-white font-medium">Payment Status</span>
              </div>
              <Badge className={order.paymentStatus === 'confirmed' ? 'bg-green-500/20 text-green-400 border-green-500' : 'bg-yellow-500/20 text-yellow-400 border-yellow-500'}>
                {order.paymentStatus.toUpperCase()}
              </Badge>
              <p className="text-slate-400 text-sm mt-1">
                {order.paymentMethod}
                {order.moniepointRef && ` • ${order.moniepointRef}`}
              </p>
            </div>
            
            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className={`h-4 w-4 ${order.otpStatus === 'verified' ? 'text-green-400' : 'text-yellow-400'}`} />
                <span className="text-white font-medium">OTP Verification</span>
              </div>
              <Badge className={order.otpStatus === 'verified' ? 'bg-green-500/20 text-green-400 border-green-500' : 'bg-yellow-500/20 text-yellow-400 border-yellow-500'}>
                {order.otpStatus.toUpperCase()}
              </Badge>
              <p className="text-slate-400 text-sm mt-1">Auto-verified by Laravel</p>
            </div>
          </div>

          {/* SLA Compliance Tracker */}
          <div className="bg-slate-700/30 rounded-lg p-4">
            <h3 className="text-white font-medium mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              SLA Compliance Tracker
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-slate-400 text-sm">Dispatch Time</p>
                <p className="text-white">
                  {order.dispatchTime ? order.dispatchTime.toLocaleString() : 'Not recorded'}
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Delivery Time</p>
                <p className="text-white">
                  {order.deliveryConfirmationTime ? order.deliveryConfirmationTime.toLocaleString() : 'Not confirmed'}
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">SLA Duration</p>
                <p className="text-white">{slaInfo.hours} hours</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">SLA Status</p>
                <Badge className={slaInfo.status === 'On Time' ? 'bg-green-500/20 text-green-400 border-green-500' : 'bg-red-500/20 text-red-400 border-red-500'}>
                  {slaInfo.status === 'On Time' ? '✅ On Time' : '❌ Late'}
                </Badge>
              </div>
            </div>
          </div>

          <Separator className="bg-slate-600" />

          {/* Product Breakdown */}
          <div>
            <h3 className="text-white font-medium mb-4">🧾 Product Breakdown</h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="bg-slate-700/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-white font-medium">{item.name}</h4>
                      <p className="text-slate-400 text-sm">
                        Unit Price: ₦{item.unitPrice.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">
                        {item.quantityDelivered}/{item.quantityOrdered} units
                      </p>
                      <p className="text-slate-400 text-sm">
                        Line Total: ₦{(item.quantityDelivered * item.unitPrice).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator className="bg-slate-600" />

          {/* Final Calculated Totals */}
          <div>
            <h3 className="text-white font-medium mb-4">💰 Final Calculated Totals</h3>
            <div className="bg-slate-700/30 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Subtotal</span>
                <span className="text-white font-medium">₦{subtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Discount</span>
                  <span className="text-green-400 font-medium">-₦{discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Expected Total</span>
                <span className="text-white font-medium">₦{expectedTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Total Amount Paid</span>
                <span className="text-green-400 font-medium">₦{order.amountPaid.toLocaleString()}</span>
              </div>
              <Separator className="bg-slate-600" />
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">Payment Match</span>
                <Badge className={paymentMatch ? 'bg-green-500/20 text-green-400 border-green-500' : 'bg-red-500/20 text-red-400 border-red-500'}>
                  {paymentMatch ? '✅ Match' : '❌ Mismatch'}
                </Badge>
              </div>
            </div>
          </div>

          {/* Timestamps */}
          <div>
            <h3 className="text-white font-medium mb-4">🕒 Timestamps</h3>
            <div className="bg-slate-700/30 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Payment Confirmation Time</span>
                <span className="text-white">
                  {order.paymentConfirmationTime ? order.paymentConfirmationTime.toLocaleString() : 'Not confirmed'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Delivery Confirmation Time</span>
                <span className="text-white">
                  {order.deliveryConfirmationTime ? order.deliveryConfirmationTime.toLocaleString() : 'Not confirmed'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default OrderDrawer;
