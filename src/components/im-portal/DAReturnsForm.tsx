
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DAReturnsForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    handover_id: '',
    quantity_returned: '',
    reason: ''
  });
  const { toast } = useToast();

  const handovers = [
    { id: '789', da_name: 'Femi', product: 'Fulani Shampoo', quantity: 50, date: '2025-06-25' },
    { id: '790', da_name: 'Tobi', product: 'Pomade', quantity: 30, date: '2025-06-24' },
    { id: '791', da_name: 'Amaka', product: 'Conditioner', quantity: 40, date: '2025-06-23' }
  ];

  const returnReasons = [
    'Customer unavailable',
    'Product damaged',
    'Wrong product delivered',
    'Customer rejected',
    'Delivery route issues',
    'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const selectedHandover = handovers.find(h => h.id === formData.handover_id);
      
      if (!selectedHandover) {
        throw new Error('Invalid handover ID.');
      }
      
      if (parseInt(formData.quantity_returned) > selectedHandover.quantity) {
        throw new Error('Cannot return more than originally assigned.');
      }
      
      toast({
        title: "Return recorded",
        description: `Successfully recorded return of ${formData.quantity_returned} units from ${selectedHandover.da_name}.`,
        variant: "default"
      });

      // Reset form
      setFormData({
        handover_id: '',
        quantity_returned: '',
        reason: ''
      });
    } catch (error) {
      toast({
        title: "Return failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedHandover = handovers.find(h => h.id === formData.handover_id);

  return (
    <Card className="bg-slate-700/30 border-slate-600">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <ArrowLeft className="h-5 w-5 text-blue-400" />
          Record DA Returns
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="handover" className="text-slate-300">Handover to Return</Label>
            <Select
              value={formData.handover_id}
              onValueChange={(value) => setFormData({ ...formData, handover_id: value })}
              required
            >
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select handover" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                {handovers.map(handover => (
                  <SelectItem key={handover.id} value={handover.id} className="text-white">
                    #{handover.id} - {handover.da_name} - {handover.product} ({handover.quantity} units)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedHandover && (
            <div className="p-3 bg-slate-700/30 rounded-lg">
              <p className="text-slate-300 text-sm">
                <strong>Original Assignment:</strong> {selectedHandover.quantity} units of {selectedHandover.product} to {selectedHandover.da_name}
              </p>
              <p className="text-slate-400 text-xs mt-1">Date: {selectedHandover.date}</p>
            </div>
          )}

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
              max={selectedHandover?.quantity || undefined}
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

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Recording return...
              </>
            ) : (
              <>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Record DA Return
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DAReturnsForm;
