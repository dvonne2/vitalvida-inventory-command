
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Factory, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ReturnToFactoryTabProps {
  onStockUpdate: (updater: (prev: any) => any) => void;
}

const ReturnToFactoryTab = ({ onStockUpdate }: ReturnToFactoryTabProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    product_id: '',
    quantity_return: '',
    return_reason: '',
    remarks: ''
  });
  const { toast } = useToast();

  const products = [
    { id: 'fulani-shampoo', name: 'Fulani Shampoo', current_stock: 450 },
    { id: 'hydration-tea', name: 'Hydration Tea', current_stock: 180 },
    { id: 'pomade', name: 'Pomade', current_stock: 250 },
    { id: 'conditioner', name: 'Conditioner', current_stock: 120 }
  ];

  const returnReasons = [
    'Surplus Stock',
    'Defective Product',
    'Expired Product',
    'Quality Issues',
    'Packaging Damage',
    'Wrong Specification'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const selectedProduct = products.find(p => p.id === formData.product_id);
      const returnQuantity = parseInt(formData.quantity_return);
      
      if (selectedProduct && returnQuantity > selectedProduct.current_stock) {
        throw new Error(`Cannot return ${returnQuantity} units. Only ${selectedProduct.current_stock} units in stock.`);
      }

      // Mock API call - replace with actual endpoint: POST /api/inventory/return-to-factory
      const apiPayload = {
        product_id: formData.product_id,
        quantity_return: returnQuantity,
        return_reason: formData.return_reason,
        remarks: formData.remarks
      };
      
      console.log('API Payload for return-to-factory:', apiPayload);
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update stock counters
      onStockUpdate(prev => ({
        ...prev,
        totalStock: prev.totalStock - returnQuantity,
        returnsProcessed: prev.returnsProcessed + 1
      }));
      
      toast({
        title: "Return to factory processed",
        description: `${returnQuantity} units of ${selectedProduct?.name} returned to factory`,
        variant: "default"
      });

      // Reset form
      setFormData({
        product_id: '',
        quantity_return: '',
        return_reason: '',
        remarks: ''
      });
    } catch (error) {
      toast({
        title: "Return processing failed",
        description: error instanceof Error ? error.message : "Please check your entry and try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedProduct = products.find(p => p.id === formData.product_id);

  return (
    <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-6">
      <h3 className="text-yellow-400 font-semibold text-lg mb-4 flex items-center gap-2">
        <Factory className="h-5 w-5" />
        Return to Factory
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <SelectItem key={product.id} value={product.id} className="text-white">
                    {product.name} (Stock: {product.current_stock})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedProduct && (
              <div className="p-3 bg-slate-700/30 rounded-lg border border-slate-600">
                <p className="text-slate-300 text-sm">
                  <strong>Current Stock:</strong> <span className="text-yellow-400 font-semibold">{selectedProduct.current_stock} units</span>
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity_return" className="text-slate-300">Quantity to Return</Label>
            <Input
              id="quantity_return"
              type="number"
              value={formData.quantity_return}
              onChange={(e) => setFormData({ ...formData, quantity_return: e.target.value })}
              placeholder="Enter quantity to return"
              className="bg-slate-700 border-slate-600 text-white"
              required
              min="1"
              max={selectedProduct?.current_stock || undefined}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="return_reason" className="text-slate-300">Return Reason</Label>
          <Select
            value={formData.return_reason}
            onValueChange={(value) => setFormData({ ...formData, return_reason: value })}
            required
          >
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="Select return reason" />
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

        {formData.quantity_return && selectedProduct && (
          <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-yellow-400 text-sm">
              <strong>Return Summary:</strong> {formData.quantity_return} units of {selectedProduct.name} will be returned to factory
            </p>
            {parseInt(formData.quantity_return) > selectedProduct.current_stock && (
              <p className="text-red-400 text-sm mt-1">
                ⚠️ Exceeds current stock ({selectedProduct.current_stock} units)
              </p>
            )}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="remarks" className="text-slate-300">Remarks</Label>
          <Textarea
            id="remarks"
            value={formData.remarks}
            onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
            placeholder="Enter additional details about the return"
            className="bg-slate-700 border-slate-600 text-white"
            rows={3}
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing return...
            </>
          ) : (
            <>
              <Factory className="mr-2 h-4 w-4" />
              Return to Factory
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default ReturnToFactoryTab;
