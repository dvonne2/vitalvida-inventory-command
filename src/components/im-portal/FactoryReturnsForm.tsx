
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Factory, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FactoryReturnsForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    product_id: '',
    quantity: '',
    reason: '',
    approved_by_factory: false
  });
  const { toast } = useToast();

  const products = [
    { id: '123', name: 'Fulani Shampoo', available_stock: 500 },
    { id: '124', name: 'Pomade', available_stock: 300 },
    { id: '125', name: 'Conditioner', available_stock: 200 },
    { id: '126', name: 'Hydration Tea', available_stock: 150 }
  ];

  const returnReasons = [
    'Defective',
    'Expired',
    'Surplus stock',
    'Quality issues',
    'Wrong batch',
    'Damaged packaging'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const selectedProduct = products.find(p => p.id === formData.product_id);
      
      toast({
        title: "Return to factory recorded",
        description: `Successfully initiated return of ${formData.quantity} units of ${selectedProduct?.name} to factory.`,
        variant: "default"
      });

      // Reset form
      setFormData({
        product_id: '',
        quantity: '',
        reason: '',
        approved_by_factory: false
      });
    } catch (error) {
      toast({
        title: "Return failed",
        description: "Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-slate-700/30 border-slate-600">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Factory className="h-5 w-5 text-green-400" />
          Return to Factory
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
                <SelectValue placeholder="Select product to return" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                {products.map(product => (
                  <SelectItem key={product.id} value={product.id} className="text-white">
                    {product.name} (Available: {product.available_stock})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-slate-300">Quantity to Return</Label>
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

          <div className="space-y-2">
            <Label htmlFor="reason" className="text-slate-300">Return Reason</Label>
            <Select
              value={formData.reason}
              onValueChange={(value) => setFormData({ ...formData, reason: value })}
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

          <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-yellow-400 text-sm">
              <strong>Note:</strong> Factory approval will be required for this return.
            </p>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Initiating return...
              </>
            ) : (
              <>
                <Factory className="mr-2 h-4 w-4" />
                Return to Factory
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FactoryReturnsForm;
