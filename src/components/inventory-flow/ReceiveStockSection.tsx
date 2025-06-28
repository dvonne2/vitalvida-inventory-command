
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Package, Plus, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ReceiveStockSectionProps {
  onStockUpdate: (updater: (prev: any) => any) => void;
}

const ReceiveStockSection = ({ onStockUpdate }: ReceiveStockSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    po_id: '',
    quantity_received: '',
    received_date: '',
    inventory_manager: '',
    remarks: '',
    digital_signature: ''
  });
  const { toast } = useToast();

  const approvedPOs = [
    { id: 'PO-2024-001', product: 'Fulani Shampoo', quantity_ordered: 500, status: 'Approved' },
    { id: 'PO-2024-002', product: 'Hydration Tea', quantity_ordered: 200, status: 'Approved' },
    { id: 'PO-2024-003', product: 'Pomade', quantity_ordered: 300, status: 'Pending Receipt' },
    { id: 'PO-2024-004', product: 'Conditioner', quantity_ordered: 150, status: 'Approved' }
  ];

  const inventoryManagers = [
    'Sarah Johnson',
    'Michael Chen', 
    'Aisha Okonkwo',
    'David Williams'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Mock API call - replace with actual endpoint: POST /api/inventory/receive-from-factory
      const apiPayload = {
        po_id: formData.po_id,
        quantity_received: parseInt(formData.quantity_received),
        received_date: formData.received_date,
        inventory_manager: formData.inventory_manager,
        remarks: formData.remarks,
        digital_signature: formData.digital_signature
      };
      
      console.log('API Payload for receive-from-factory:', apiPayload);
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update stock counters
      onStockUpdate(prev => ({
        ...prev,
        totalStock: prev.totalStock + parseInt(formData.quantity_received),
        pendingReceipts: prev.pendingReceipts - 1
      }));
      
      toast({
        title: "Stock received successfully",
        description: `${formData.quantity_received} units received from factory for PO ${formData.po_id}`,
        variant: "default"
      });

      // Reset form and close modal
      setFormData({
        po_id: '',
        quantity_received: '',
        received_date: '',
        inventory_manager: '',
        remarks: '',
        digital_signature: ''
      });
      setIsModalOpen(false);
    } catch (error) {
      toast({
        title: "Receipt failed",
        description: "Please check your entry and try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved':
        return <Badge className="bg-green-500/20 text-green-400">Approved</Badge>;
      case 'Pending Receipt':
        return <Badge className="bg-yellow-500/20 text-yellow-400">Pending Receipt</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400">{status}</Badge>;
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-3">
            <Package className="h-6 w-6 text-green-400" />
            Receive Stock from Factory
          </CardTitle>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Receive Stock
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-green-400">Receive Stock from Factory</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="po_id" className="text-slate-300">Purchase Order</Label>
                    <Select
                      value={formData.po_id}
                      onValueChange={(value) => setFormData({ ...formData, po_id: value })}
                      required
                    >
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="Select PO" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        {approvedPOs.map(po => (
                          <SelectItem key={po.id} value={po.id} className="text-white">
                            {po.id} - {po.product}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity_received" className="text-slate-300">Quantity Received</Label>
                    <Input
                      id="quantity_received"
                      type="number"
                      value={formData.quantity_received}
                      onChange={(e) => setFormData({ ...formData, quantity_received: e.target.value })}
                      placeholder="Enter quantity"
                      className="bg-slate-700 border-slate-600 text-white"
                      required
                      min="1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="received_date" className="text-slate-300">Received Date</Label>
                    <Input
                      id="received_date"
                      type="date"
                      value={formData.received_date}
                      onChange={(e) => setFormData({ ...formData, received_date: e.target.value })}
                      className="bg-slate-700 border-slate-600 text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inventory_manager" className="text-slate-300">Inventory Manager</Label>
                    <Select
                      value={formData.inventory_manager}
                      onValueChange={(value) => setFormData({ ...formData, inventory_manager: value })}
                      required
                    >
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="Select Manager" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        {inventoryManagers.map(manager => (
                          <SelectItem key={manager} value={manager} className="text-white">
                            {manager}
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
                    placeholder="Enter any remarks or notes"
                    className="bg-slate-700 border-slate-600 text-white"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="digital_signature" className="text-slate-300">Digital Signature</Label>
                  <Input
                    id="digital_signature"
                    type="text"
                    value={formData.digital_signature}
                    onChange={(e) => setFormData({ ...formData, digital_signature: e.target.value })}
                    placeholder="Enter your digital signature"
                    className="bg-slate-700 border-slate-600 text-white"
                    required
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
                      Receiving stock...
                    </>
                  ) : (
                    'Receive Stock'
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700 hover:bg-slate-700/50">
                <TableHead className="text-slate-300">PO ID</TableHead>
                <TableHead className="text-slate-300">Product</TableHead>
                <TableHead className="text-slate-300">Quantity Ordered</TableHead>
                <TableHead className="text-slate-300">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {approvedPOs.map((po) => (
                <TableRow key={po.id} className="border-slate-700 hover:bg-slate-700/30">
                  <TableCell className="text-white font-medium">{po.id}</TableCell>
                  <TableCell className="text-white">{po.product}</TableCell>
                  <TableCell className="text-white">{po.quantity_ordered}</TableCell>
                  <TableCell>{getStatusBadge(po.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReceiveStockSection;
