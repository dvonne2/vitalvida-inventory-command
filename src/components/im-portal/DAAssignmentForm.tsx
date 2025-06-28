
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Users, Package, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DAAssignmentForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    delivery_agent_id: '',
    product_id: '',
    units_assigned: ''
  });
  const { toast } = useToast();

  const deliveryAgents = [
    { id: 'DA123', name: 'Femi', location: 'Lagos Island' },
    { id: 'DA124', name: 'Tobi', location: 'Abeokuta' },
    { id: 'DA125', name: 'Amaka', location: 'Wuse' },
    { id: 'DA126', name: 'Kemi', location: 'Victoria Island' }
  ];

  const products = [
    { id: '123', name: 'Fulani Shampoo', available_stock: 500 },
    { id: '124', name: 'Pomade', available_stock: 300 },
    { id: '125', name: 'Conditioner', available_stock: 200 },
    { id: '126', name: 'Hydration Tea', available_stock: 150 }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const selectedProduct = products.find(p => p.id === formData.product_id);
      const unitsToAssign = parseInt(formData.units_assigned);
      
      // Fraud prevention: Check if trying to assign more than available stock
      if (selectedProduct && unitsToAssign > selectedProduct.available_stock) {
        throw new Error(`Cannot assign ${unitsToAssign} units. Only ${selectedProduct.available_stock} units available.`);
      }

      // Fraud prevention: Check for negative or zero values
      if (unitsToAssign <= 0) {
        throw new Error('Units to assign must be greater than zero.');
      }

      // Mock API call - replace with actual endpoint: POST /api/inventory/assign-to-da
      const apiPayload = {
        delivery_agent_id: parseInt(formData.delivery_agent_id.replace('DA', '')),
        product_id: parseInt(formData.product_id),
        units_assigned: unitsToAssign
      };
      
      console.log('API Payload:', apiPayload);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const selectedDA = deliveryAgents.find(da => da.id === formData.delivery_agent_id);
      
      toast({
        title: "Stock assigned successfully",
        description: `${unitsToAssign} units of ${selectedProduct?.name} assigned to ${selectedDA?.name}.`,
        variant: "default"
      });

      // Reset form after successful assignment
      setFormData({
        delivery_agent_id: '',
        product_id: '',
        units_assigned: ''
      });
    } catch (error) {
      toast({
        title: "Assignment failed",
        description: error instanceof Error ? error.message : "Please check your entry and try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedProduct = products.find(p => p.id === formData.product_id);
  const unitsToAssign = formData.units_assigned ? parseInt(formData.units_assigned) : 0;

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Users className="h-5 w-5 text-orange-400" />
          Assign Stock to Delivery Agent
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="delivery_agent" className="text-slate-300">Delivery Agent</Label>
            <Select
              value={formData.delivery_agent_id}
              onValueChange={(value) => setFormData({ ...formData, delivery_agent_id: value })}
              required
            >
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select DA" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                {deliveryAgents.map(da => (
                  <SelectItem key={da.id} value={da.id} className="text-white">
                    {da.name} - {da.location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

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
                    {product.name} (Available: {product.available_stock})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedProduct && (
            <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
              <p className="text-slate-300 text-sm">
                <strong>Available Stock:</strong> <span className="text-green-400 font-semibold">{selectedProduct.available_stock} units</span>
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="units_assigned" className="text-slate-300">Units to Assign</Label>
            <Input
              id="units_assigned"
              type="number"
              value={formData.units_assigned}
              onChange={(e) => setFormData({ ...formData, units_assigned: e.target.value })}
              placeholder="Enter number of units"
              className="bg-slate-700 border-slate-600 text-white"
              required
              min="1"
              max={selectedProduct?.available_stock || undefined}
            />
          </div>

          {unitsToAssign > 0 && selectedProduct && (
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-blue-400 text-sm">
                <strong>Assignment Summary:</strong> {unitsToAssign} units of {selectedProduct.name}
              </p>
              {unitsToAssign > selectedProduct.available_stock && (
                <p className="text-red-400 text-sm mt-1">
                  ⚠️ Exceeds available stock ({selectedProduct.available_stock} units)
                </p>
              )}
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting || !formData.delivery_agent_id || !formData.product_id || !formData.units_assigned}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Assigning stock...
              </>
            ) : (
              <>
                <Package className="mr-2 h-4 w-4" />
                Assign Stock to DA
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DAAssignmentForm;
