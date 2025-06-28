
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Package, Truck, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const GoodsReceiptForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    purchase_order_id: '',
    quantity_received: '',
    received_by: 'IM_USER_ID',
    fulfilled_by: ''
  });
  const { toast } = useToast();

  const approvedPOs = [
    { id: 101, product_name: 'Fulani Shampoo', quantity: 200 },
    { id: 104, product_name: 'Pomade', quantity: 150 },
    { id: 105, product_name: 'Conditioner', quantity: 100 }
  ];

  const factories = [
    { id: 'factory_1', name: 'Vitalvida Main Factory' },
    { id: 'factory_2', name: 'Vitalvida Secondary Plant' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const selectedPO = approvedPOs.find(po => po.id.toString() === formData.purchase_order_id);
      
      // Simulate quantity mismatch check
      if (selectedPO && parseInt(formData.quantity_received) > selectedPO.quantity) {
        throw new Error('Mismatch in PO and received qty.');
      }
      
      toast({
        title: "Stock received!",
        description: `Successfully logged receipt of ${formData.quantity_received} units.`,
        variant: "default"
      });

      // Reset form
      setFormData({
        purchase_order_id: '',
        quantity_received: '',
        received_by: 'IM_USER_ID',
        fulfilled_by: ''
      });
    } catch (error) {
      toast({
        title: "Error logging receipt",
        description: error instanceof Error ? error.message : "Please check your entry and try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedPO = approvedPOs.find(po => po.id.toString() === formData.purchase_order_id);

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Package className="h-5 w-5 text-purple-400" />
          Factory → Inventory Movement
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="purchase_order" className="text-slate-300">Purchase Order</Label>
            <Select
              value={formData.purchase_order_id}
              onValueChange={(value) => setFormData({ ...formData, purchase_order_id: value })}
              required
            >
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select approved PO" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                {approvedPOs.map(po => (
                  <SelectItem key={po.id} value={po.id.toString()} className="text-white">
                    PO #{po.id} - {po.product_name} ({po.quantity} units)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedPO && (
            <div className="p-3 bg-slate-700/30 rounded-lg">
              <p className="text-slate-300 text-sm">
                <strong>Expected:</strong> {selectedPO.quantity} units of {selectedPO.product_name}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="quantity_received" className="text-slate-300">Quantity Received</Label>
            <Input
              id="quantity_received"
              type="number"
              value={formData.quantity_received}
              onChange={(e) => setFormData({ ...formData, quantity_received: e.target.value })}
              placeholder="Enter actual quantity received"
              className="bg-slate-700 border-slate-600 text-white"
              required
              min="1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fulfilled_by" className="text-slate-300">Fulfilled By</Label>
            <Select
              value={formData.fulfilled_by}
              onValueChange={(value) => setFormData({ ...formData, fulfilled_by: value })}
              required
            >
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select factory" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                {factories.map(factory => (
                  <SelectItem key={factory.id} value={factory.name} className="text-white">
                    {factory.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging receipt...
              </>
            ) : (
              <>
                <Truck className="mr-2 h-4 w-4" />
                Log Goods Receipt
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default GoodsReceiptForm;
