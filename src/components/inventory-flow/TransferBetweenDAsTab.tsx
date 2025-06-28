
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRightLeft, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TransferBetweenDAsTabProps {
  onStockUpdate: (updater: (prev: any) => any) => void;
}

const TransferBetweenDAsTab = ({ onStockUpdate }: TransferBetweenDAsTabProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    source_da_id: '',
    destination_da_id: '',
    product_id: '',
    quantity_transfer: '',
    remarks: ''
  });
  const { toast } = useToast();

  const deliveryAgents = [
    'DA001 - Femi Adebayo (Lagos Island)',
    'DA002 - Tobi Johnson (Abeokuta)',
    'DA003 - Amaka Okafor (Wuse)',
    'DA004 - Kemi Williams (Victoria Island)'
  ];

  const products = [
    'Fulani Shampoo',
    'Hydration Tea', 
    'Pomade',
    'Conditioner'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (formData.source_da_id === formData.destination_da_id) {
        throw new Error('Source and destination DA cannot be the same.');
      }

      // Mock API call - replace with actual endpoint: POST /api/inventory/transfer-between-das
      const apiPayload = {
        source_da_id: formData.source_da_id,
        destination_da_id: formData.destination_da_id,
        product_id: formData.product_id,
        quantity_transfer: parseInt(formData.quantity_transfer),
        remarks: formData.remarks
      };
      
      console.log('API Payload for transfer-between-das:', apiPayload);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Transfer initiated successfully",
        description: `${formData.quantity_transfer} units of ${formData.product_id} transferred from ${formData.source_da_id} to ${formData.destination_da_id}`,
        variant: "default"
      });

      // Reset form
      setFormData({
        source_da_id: '',
        destination_da_id: '',
        product_id: '',
        quantity_transfer: '',
        remarks: ''
      });
    } catch (error) {
      toast({
        title: "Transfer failed",
        description: error instanceof Error ? error.message : "Please check your entry and try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-6">
      <h3 className="text-red-400 font-semibold text-lg mb-4 flex items-center gap-2">
        <ArrowRightLeft className="h-5 w-5" />
        Transfer Between DAs
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="source_da_id" className="text-slate-300">Source DA</Label>
            <Select
              value={formData.source_da_id}
              onValueChange={(value) => setFormData({ ...formData, source_da_id: value })}
              required
            >
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select source DA" />
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
            <Label htmlFor="destination_da_id" className="text-slate-300">Destination DA</Label>
            <Select
              value={formData.destination_da_id}
              onValueChange={(value) => setFormData({ ...formData, destination_da_id: value })}
              required
            >
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select destination DA" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                {deliveryAgents.filter(da => da !== formData.source_da_id).map(da => (
                  <SelectItem key={da} value={da} className="text-white">
                    {da}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="product_id" className="text-slate-300">Product</Label>
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

          <div className="space-y-2">
            <Label htmlFor="quantity_transfer" className="text-slate-300">Quantity to Transfer</Label>
            <Input
              id="quantity_transfer"
              type="number"
              value={formData.quantity_transfer}
              onChange={(e) => setFormData({ ...formData, quantity_transfer: e.target.value })}
              placeholder="Enter quantity to transfer"
              className="bg-slate-700 border-slate-600 text-white"
              required
              min="1"
            />
          </div>
        </div>

        {formData.source_da_id && formData.destination_da_id && formData.quantity_transfer && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm">
              <strong>Transfer Summary:</strong> Moving {formData.quantity_transfer} units of {formData.product_id || 'selected product'} from {formData.source_da_id.split(' - ')[1]} to {formData.destination_da_id.split(' - ')[1]}
            </p>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="remarks" className="text-slate-300">Transfer Remarks</Label>
          <Textarea
            id="remarks"
            value={formData.remarks}
            onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
            placeholder="Enter transfer reason or remarks"
            className="bg-slate-700 border-slate-600 text-white"
            rows={3}
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-red-600 hover:bg-red-700 text-white"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing transfer...
            </>
          ) : (
            <>
              <ArrowRightLeft className="mr-2 h-4 w-4" />
              Initiate Transfer
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default TransferBetweenDAsTab;
