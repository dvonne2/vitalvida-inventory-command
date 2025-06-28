
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RotateCcw, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DAReturnsTabProps {
  onStockUpdate: (updater: (prev: any) => any) => void;
}

const DAReturnsTab = ({ onStockUpdate }: DAReturnsTabProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    da_id: '',
    product_id: '',
    quantity_returned: '',
    return_reason: '',
    remarks: ''
  });
  const { toast } = useToast();

  const deliveryAgents = [
    'DA001 - Femi Adebayo',
    'DA002 - Tobi Johnson',
    'DA003 - Amaka Okafor',
    'DA004 - Kemi Williams'
  ];

  const products = [
    'Fulani Shampoo',
    'Hydration Tea',
    'Pomade',
    'Conditioner'
  ];

  const returnReasons = [
    'Failed Delivery',
    'Expired Product',
    'Customer Rejected',
    'Damaged in Transit',
    'Wrong Product Delivered'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Mock API call - replace with actual endpoint: POST /api/inventory/returns-from-da
      const apiPayload = {
        da_id: formData.da_id,
        product_id: formData.product_id,
        quantity_returned: parseInt(formData.quantity_returned),
        return_reason: formData.return_reason,
        remarks: formData.remarks
      };
      
      console.log('API Payload for returns-from-da:', apiPayload);
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update stock counters
      onStockUpdate(prev => ({
        ...prev,
        totalStock: prev.totalStock + parseInt(formData.quantity_returned),
        returnsProcessed: prev.returnsProcessed + 1,
        assignedToDA: prev.assignedToDA - parseInt(formData.quantity_returned)
      }));
      
      toast({
        title: "Return processed successfully",
        description: `${formData.quantity_returned} units of ${formData.product_id} returned from ${formData.da_id}`,
        variant: "default"
      });

      // Reset form
      setFormData({
        da_id: '',
        product_id: '',
        quantity_returned: '',
        return_reason: '',
        remarks: ''
      });
    } catch (error) {
      toast({
        title: "Return processing failed",
        description: "Please check your entry and try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-orange-500/5 border border-orange-500/20 rounded-lg p-6">
      <h3 className="text-orange-400 font-semibold text-lg mb-4 flex items-center gap-2">
        <RotateCcw className="h-5 w-5" />
        DA Returns
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="da_id" className="text-slate-300">Select Delivery Agent</Label>
            <Select
              value={formData.da_id}
              onValueChange={(value) => setFormData({ ...formData, da_id: value })}
              required
            >
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select DA" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                {deliveryAgents.map(da => (
                  <SelectItem key={da} value={da} className="text-white">
                    {da}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="product_id" className="text-slate-300">Select Product</Label>
            <Select
              value={formData.product_id}
              onValueChange={(value) => setFormData({ ...formData, product_id: value })}
              required
            >
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select product" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                {products.map(product => (
                  <SelectItem key={product} value={product} className="text-white">
                    {product}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="quantity_returned" className="text-slate-300">Quantity Returned</Label>
            <Input
              id="quantity_returned"
              type="number"
              value={formData.quantity_returned}
              onChange={(e) => setFormData({ ...formData, quantity_returned: e.target.value })}
              placeholder="Enter quantity returned"
              className="bg-slate-700 border-slate-600 text-white"
              required
              min="1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="return_reason" className="text-slate-300">Return Reason</Label>
            <Select
              value={formData.return_reason}
              onValueChange={(value) => setFormData({ ...formData, return_reason: value })}
              required
            >
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                {returnReasons.map(reason => (
                  <SelectItem key={reason} value={reason} className="text-white">
                    {reason}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="remarks" className="text-slate-300">Remarks</Label>
          <Textarea
            id="remarks"
            value={formData.remarks}
            onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
            placeholder="Enter any additional remarks"
            className="bg-slate-700 border-slate-600 text-white"
            rows={3}
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing return...
            </>
          ) : (
            <>
              <RotateCcw className="mr-2 h-4 w-4" />
              Process DA Return
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default DAReturnsTab;
