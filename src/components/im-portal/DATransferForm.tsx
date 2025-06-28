
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ArrowLeftRight, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DATransferForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    from_da_handover_id: '',
    to_da_id: '',
    quantity_to_transfer: ''
  });
  const { toast } = useToast();

  const activeHandovers = [
    { id: '789', da_name: 'Femi', product: 'Fulani Shampoo', quantity: 50, da_id: 'DA123' },
    { id: '790', da_name: 'Tobi', product: 'Pomade', quantity: 30, da_id: 'DA124' },
    { id: '791', da_name: 'Amaka', product: 'Conditioner', quantity: 40, da_id: 'DA125' }
  ];

  const deliveryAgents = [
    { id: 'DA123', name: 'Femi', location: 'Lagos Island' },
    { id: 'DA124', name: 'Tobi', location: 'Abeokuta' },
    { id: 'DA125', name: 'Amaka', location: 'Wuse' },
    { id: 'DA126', name: 'Kemi', location: 'Victoria Island' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const selectedHandover = activeHandovers.find(h => h.id === formData.from_da_handover_id);
      const targetDA = deliveryAgents.find(da => da.id === formData.to_da_id);
      
      if (!selectedHandover || !targetDA) {
        throw new Error('Invalid selection');
      }
      
      if (selectedHandover.da_id === formData.to_da_id) {
        throw new Error('Cannot transfer to the same DA');
      }
      
      if (parseInt(formData.quantity_to_transfer) > selectedHandover.quantity) {
        throw new Error('Cannot transfer more than available');
      }

      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Transfer completed",
        description: `Successfully transferred ${formData.quantity_to_transfer} units from ${selectedHandover.da_name} to ${targetDA.name}.`,
        variant: "default"
      });

      // Reset form
      setFormData({
        from_da_handover_id: '',
        to_da_id: '',
        quantity_to_transfer: ''
      });
    } catch (error) {
      toast({
        title: "Transfer failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedHandover = activeHandovers.find(h => h.id === formData.from_da_handover_id);
  const availableTargetDAs = deliveryAgents.filter(da => da.id !== selectedHandover?.da_id);

  return (
    <Card className="bg-slate-700/30 border-slate-600">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <ArrowLeftRight className="h-5 w-5 text-purple-400" />
          Transfer Between DAs
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="from_handover" className="text-slate-300">Transfer From (DA Stock)</Label>
            <Select
              value={formData.from_da_handover_id}
              onValueChange={(value) => setFormData({ ...formData, from_da_handover_id: value, to_da_id: '' })}
              required
            >
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select source DA stock" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                {activeHandovers.map(handover => (
                  <SelectItem key={handover.id} value={handover.id} className="text-white">
                    {handover.da_name} - {handover.product} ({handover.quantity} units)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedHandover && (
            <div className="p-3 bg-slate-700/30 rounded-lg">
              <p className="text-slate-300 text-sm">
                <strong>Source:</strong> {selectedHandover.da_name} has {selectedHandover.quantity} units of {selectedHandover.product}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="to_da" className="text-slate-300">Transfer To (Target DA)</Label>
            <Select
              value={formData.to_da_id}
              onValueChange={(value) => setFormData({ ...formData, to_da_id: value })}
              required
              disabled={!selectedHandover}
            >
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select target DA" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                {availableTargetDAs.map(da => (
                  <SelectItem key={da.id} value={da.id} className="text-white">
                    {da.name} - {da.location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-slate-300">Quantity to Transfer</Label>
            <Input
              id="quantity"
              type="number"
              value={formData.quantity_to_transfer}
              onChange={(e) => setFormData({ ...formData, quantity_to_transfer: e.target.value })}
              placeholder="Enter quantity"
              className="bg-slate-700 border-slate-600 text-white"
              required
              min="1"
              max={selectedHandover?.quantity || undefined}
            />
          </div>

          <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-blue-400 text-sm">
              <strong>Process:</strong> Stock will be returned from source DA to inventory, then assigned to target DA.
            </p>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing transfer...
              </>
            ) : (
              <>
                <ArrowLeftRight className="mr-2 h-4 w-4" />
                Transfer Stock
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DATransferForm;
