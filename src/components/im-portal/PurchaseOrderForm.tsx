
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { FileText, Send, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PurchaseOrderForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    product_id: '',
    quantity: '',
    requested_by: 'IM_USER_ID' // This would come from auth context
  });
  const { toast } = useToast();

  const products = [
    { id: '123', name: 'Fulani Shampoo' },
    { id: '124', name: 'Pomade' },
    { id: '125', name: 'Conditioner' },
    { id: '126', name: 'Hydration Tea' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate API success
      toast({
        title: "Purchase Order Submitted!",
        description: `PO for ${formData.quantity} units has been sent to the factory.`,
        variant: "default"
      });

      // Reset form
      setFormData({
        product_id: '',
        quantity: '',
        requested_by: 'IM_USER_ID'
      });
    } catch (error) {
      toast({
        title: "Unable to submit PO",
        description: "Please check your entry and try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <FileText className="h-5 w-5 text-green-400" />
          Create Purchase Order
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="product" className="text-slate-300">Product</Label>
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
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-slate-300">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              placeholder="Enter quantity"
              className="bg-slate-700 border-slate-600 text-white"
              required
              min="1"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting PO...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit Purchase Order
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PurchaseOrderForm;
