
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
    cartons: '',
    units_per_carton: '6' // Default value
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
      const totalUnits = parseInt(formData.cartons) * parseInt(formData.units_per_carton);
      
      // Check if trying to assign more than available stock
      if (selectedProduct && totalUnits > selectedProduct.available_stock) {
        throw new Error('Cannot assign more than available stock.');
      }

      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const selectedDA = deliveryAgents.find(da => da.id === formData.delivery_agent_id);
      
      toast({
        title: "Stock handed over to DA",
        description: `Successfully assigned ${totalUnits} units to ${selectedDA?.name}.`,
        variant: "default"
      });

      // Reset form
      setFormData({
        delivery_agent_id: '',
        product_id: '',
        cartons: '',
        units_per_carton: '6'
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
  const totalUnits = formData.cartons && formData.units_per_carton ? 
    parseInt(formData.cartons) * parseInt(formData.units_per_carton) : 0;

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Users className="h-5 w-5 text-orange-400" />
          Assign Stock to Delivery Agent
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <div className="p-3 bg-slate-700/30 rounded-lg">
              <p className="text-slate-300 text-sm">
                <strong>Available Stock:</strong> {selectedProduct.available_stock} units
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cartons" className="text-slate-300">Number of Cartons</Label>
              <Input
                id="cartons"
                type="number"
                value={formData.cartons}
                onChange={(e) => setFormData({ ...formData, cartons: e.target.value })}
                placeholder="Enter cartons"
                className="bg-slate-700 border-slate-600 text-white"
                required
                min="1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="units_per_carton" className="text-slate-300">Units per Carton</Label>
              <Input
                id="units_per_carton"
                type="number"
                value={formData.units_per_carton}
                onChange={(e) => setFormData({ ...formData, units_per_carton: e.target.value })}
                placeholder="Units per carton"
                className="bg-slate-700 border-slate-600 text-white"
                required
                min="1"
              />
            </div>
          </div>

          {totalUnits > 0 && (
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-blue-400 text-sm">
                <strong>Total Units to Assign:</strong> {totalUnits} units
              </p>
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
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
