
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Phone, CheckCircle, XCircle } from 'lucide-react';

interface DeliveryConfirmation {
  orderNo: string;
  customerName: string;
  customerPhone: string;
  da: string;
  product: string;
  confirmedByTelesales: boolean;
  confirmationNotes: string;
  confirmedAt: Date | null;
  confirmedBy: string | null;
}

const TelesalesConfirmationPanel = () => {
  const [searchOrderNo, setSearchOrderNo] = useState('');
  const [confirmationNotes, setConfirmationNotes] = useState('');
  const [deliveries, setDeliveries] = useState<DeliveryConfirmation[]>([
    {
      orderNo: '111178',
      customerName: 'Mrs. Adebayo',
      customerPhone: '+2348123456789',
      da: 'Femi',
      product: 'Shampoo',
      confirmedByTelesales: false,
      confirmationNotes: '',
      confirmedAt: null,
      confirmedBy: null
    },
    {
      orderNo: '111179',
      customerName: 'Mr. Okafor',
      customerPhone: '+2348987654321',
      da: 'Femi',
      product: 'Pomade',
      confirmedByTelesales: false,
      confirmationNotes: '',
      confirmedAt: null,
      confirmedBy: null
    },
    {
      orderNo: '111180',
      customerName: 'Ms. Ibrahim',
      customerPhone: '+2348555444333',
      da: 'Tobi',
      product: 'Conditioner',
      confirmedByTelesales: true,
      confirmationNotes: 'Customer confirmed receipt. Very satisfied with product quality.',
      confirmedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      confirmedBy: 'Telesales Agent 1'
    }
  ]);
  const [loading, setLoading] = useState(false);

  const handleConfirmDelivery = async (orderNo: string) => {
    if (!confirmationNotes.trim()) {
      alert('Please add confirmation notes before confirming delivery');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call to confirm delivery
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setDeliveries(prev =>
        prev.map(delivery =>
          delivery.orderNo === orderNo
            ? {
                ...delivery,
                confirmedByTelesales: true,
                confirmationNotes,
                confirmedAt: new Date(),
                confirmedBy: 'Current Telesales Agent' // Replace with actual user ID
              }
            : delivery
        )
      );
      
      setConfirmationNotes('');
      console.log(`Delivery confirmed for order ${orderNo} by telesales at ${new Date().toISOString()}`);
    } catch (error) {
      console.error('Failed to confirm delivery:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDeliveries = deliveries.filter(delivery =>
    !searchOrderNo || delivery.orderNo.includes(searchOrderNo)
  );

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Phone className="h-5 w-5 text-blue-400" />
          Telesales Delivery Confirmation Panel
        </CardTitle>
        <p className="text-slate-400 text-sm">
          Call customers to confirm delivery and log confirmation details
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search Section */}
        <div className="p-4 bg-slate-700/50 rounded-lg">
          <Label htmlFor="searchOrder" className="text-slate-300">Search Order Number</Label>
          <Input
            id="searchOrder"
            value={searchOrderNo}
            onChange={(e) => setSearchOrderNo(e.target.value)}
            placeholder="e.g., 111178"
            className="bg-slate-600 border-slate-500 text-white mt-2"
          />
        </div>

        {/* Deliveries List */}
        <div className="space-y-4">
          <h3 className="text-white font-medium">📋 Pending/Confirmed Deliveries</h3>
          {filteredDeliveries.length === 0 ? (
            <div className="text-slate-400 text-center py-8">
              No deliveries found
            </div>
          ) : (
            filteredDeliveries.map((delivery) => (
              <div key={delivery.orderNo} className={`p-4 rounded-lg ${delivery.confirmedByTelesales ? 'bg-green-900/20 border border-green-500/30' : 'bg-slate-700/50'}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-white font-mono font-bold">#{delivery.orderNo}</span>
                      <Badge className={delivery.confirmedByTelesales ? "bg-green-500/20 text-green-400 border-green-500" : "bg-yellow-500/20 text-yellow-400 border-yellow-500"}>
                        {delivery.confirmedByTelesales ? "✅ Confirmed" : "⏳ Pending"}
                      </Badge>
                    </div>
                    <div className="text-slate-300">
                      <div><strong>Customer:</strong> {delivery.customerName}</div>
                      <div><strong>Phone:</strong> {delivery.customerPhone}</div>
                      <div><strong>DA:</strong> {delivery.da}</div>
                      <div><strong>Product:</strong> {delivery.product}</div>
                    </div>
                    {delivery.confirmedByTelesales && delivery.confirmedAt && (
                      <div className="text-green-400 text-sm">
                        Confirmed by {delivery.confirmedBy} at {delivery.confirmedAt.toLocaleString()}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center">
                    {delivery.confirmedByTelesales ? (
                      <CheckCircle className="h-6 w-6 text-green-400" />
                    ) : (
                      <XCircle className="h-6 w-6 text-yellow-400" />
                    )}
                  </div>
                </div>

                {delivery.confirmedByTelesales ? (
                  <div className="p-3 bg-slate-600/50 rounded-lg">
                    <h4 className="text-slate-300 font-medium mb-2">Confirmation Notes:</h4>
                    <p className="text-slate-200 text-sm">{delivery.confirmationNotes}</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor={`notes-${delivery.orderNo}`} className="text-slate-300">
                        Confirmation Notes (Required)
                      </Label>
                      <Textarea
                        id={`notes-${delivery.orderNo}`}
                        value={confirmationNotes}
                        onChange={(e) => setConfirmationNotes(e.target.value)}
                        placeholder="e.g., Customer confirmed receipt. Satisfied with product quality. No complaints."
                        className="bg-slate-600 border-slate-500 text-white mt-2"
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button
                        onClick={() => handleConfirmDelivery(delivery.orderNo)}
                        disabled={loading || !confirmationNotes.trim()}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        ✅ Confirm Delivery
                      </Button>
                      <Button
                        variant="outline"
                        className="border-slate-500 text-slate-300 hover:bg-slate-700"
                      >
                        📞 Call Customer
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
          <h4 className="text-white font-medium mb-2">📞 Telesales Confirmation Protocol:</h4>
          <ul className="text-slate-300 text-sm space-y-1">
            <li>• Call customer directly to confirm delivery received</li>
            <li>• Verify product details and customer satisfaction</li>
            <li>• Document any complaints or feedback</li>
            <li>• Confirmation notes are mandatory for approval workflow</li>
            <li>• Only confirmed deliveries can proceed to inventory approval</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default TelesalesConfirmationPanel;
