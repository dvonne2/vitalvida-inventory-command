
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Users, Loader2, Package, Upload, Camera, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AssignToDAProps {
  onStockUpdate: (updater: (prev: any) => any) => void;
}

const AssignToDASection = ({ onStockUpdate }: AssignToDAProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedPhoto, setUploadedPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    product_id: '',
    delivery_agent_id: '',
    quantity_to_assign: '',
    assignment_remarks: ''
  });
  const { toast } = useToast();

  const products = [
    { id: '1', name: 'Fulani Shampoo', available_quantity: 450 },
    { id: '2', name: 'Hydration Tea', available_quantity: 180 },
    { id: '3', name: 'Pomade', available_quantity: 250 },
    { id: '4', name: 'Conditioner', available_quantity: 120 }
  ];

  const deliveryAgents = [
    { id: 'DA001', name: 'Femi Adebayo', location: 'Lagos Island', current_capacity: 85, max_capacity: 100 },
    { id: 'DA002', name: 'Tobi Johnson', location: 'Abeokuta', current_capacity: 60, max_capacity: 100 },
    { id: 'DA003', name: 'Amaka Okafor', location: 'Wuse', current_capacity: 40, max_capacity: 100 },
    { id: 'DA004', name: 'Kemi Williams', location: 'Victoria Island', current_capacity: 75, max_capacity: 100 }
  ];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload a JPEG or PNG image.",
          variant: "destructive"
        });
        return;
      }

      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 10MB.",
          variant: "destructive"
        });
        return;
      }

      setUploadedPhoto(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setUploadedPhoto(null);
    setPhotoPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const selectedProduct = products.find(p => p.id === formData.product_id);
      const quantityToAssign = parseInt(formData.quantity_to_assign);
      
      // Validation
      if (selectedProduct && quantityToAssign > selectedProduct.available_quantity) {
        throw new Error(`Cannot assign ${quantityToAssign} units. Only ${selectedProduct.available_quantity} units available.`);
      }

      if (quantityToAssign <= 0) {
        throw new Error('Quantity to assign must be greater than zero.');
      }

      // Photo upload validation
      if (!uploadedPhoto) {
        throw new Error('Please upload a photo of the goods being assigned before proceeding.');
      }

      // Mock API call - replace with actual endpoint: POST /api/inventory/assign-to-da
      const apiPayload = {
        product_id: parseInt(formData.product_id),
        delivery_agent_id: formData.delivery_agent_id,
        quantity_to_assign: quantityToAssign,
        assignment_remarks: formData.assignment_remarks,
        handover_photo: uploadedPhoto.name,
        timestamp: new Date().toISOString(),
        uploaded_by: 'Inventory Manager' // In real app, get from auth context
      };
      
      console.log('API Payload for assign-to-da:', apiPayload);
      console.log('Photo file:', uploadedPhoto);
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update stock counters
      onStockUpdate(prev => ({
        ...prev,
        assignedToDA: prev.assignedToDA + quantityToAssign
      }));
      
      const selectedDA = deliveryAgents.find(da => da.id === formData.delivery_agent_id);
      
      toast({
        title: "Stock assigned successfully",
        description: `${quantityToAssign} units of ${selectedProduct?.name} assigned to ${selectedDA?.name} with photo verification.`,
        variant: "default"
      });

      // Reset form
      setFormData({
        product_id: '',
        delivery_agent_id: '',
        quantity_to_assign: '',
        assignment_remarks: ''
      });
      setUploadedPhoto(null);
      setPhotoPreview(null);
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
  const selectedDA = deliveryAgents.find(da => da.id === formData.delivery_agent_id);
  const quantityToAssign = formData.quantity_to_assign ? parseInt(formData.quantity_to_assign) : 0;

  const getCapacityColor = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage < 50) return 'text-green-400';
    if (percentage < 80) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-3">
          <Users className="h-6 w-6 text-blue-400" />
          Assign to Delivery Agent
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <SelectItem key={product.id} value={product.id} className="text-white">
                      {product.name} (Available: {product.available_quantity})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedProduct && (
                <div className="p-3 bg-slate-700/30 rounded-lg border border-slate-600">
                  <p className="text-slate-300 text-sm">
                    <strong>Available Stock:</strong> <span className="text-green-400 font-semibold">{selectedProduct.available_quantity} units</span>
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="delivery_agent_id" className="text-slate-300">Delivery Agent</Label>
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
              {selectedDA && (
                <div className="p-3 bg-slate-700/30 rounded-lg border border-slate-600">
                  <p className="text-slate-300 text-sm">
                    <strong>Current Capacity:</strong> 
                    <span className={`font-semibold ml-1 ${getCapacityColor(selectedDA.current_capacity, selectedDA.max_capacity)}`}>
                      {selectedDA.current_capacity}/{selectedDA.max_capacity} units ({Math.round((selectedDA.current_capacity / selectedDA.max_capacity) * 100)}%)
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity_to_assign" className="text-slate-300">Quantity to Assign</Label>
            <Input
              id="quantity_to_assign"
              type="number"
              value={formData.quantity_to_assign}
              onChange={(e) => setFormData({ ...formData, quantity_to_assign: e.target.value })}
              placeholder="Enter quantity to assign"
              className="bg-slate-700 border-slate-600 text-white"
              required
              min="1"
              max={selectedProduct?.available_quantity || undefined}
            />
          </div>

          {quantityToAssign > 0 && selectedProduct && (
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-blue-400 text-sm">
                <strong>Assignment Summary:</strong> {quantityToAssign} units of {selectedProduct.name}
              </p>
              {quantityToAssign > selectedProduct.available_quantity && (
                <p className="text-red-400 text-sm mt-1">
                  ⚠️ Exceeds available stock ({selectedProduct.available_quantity} units)
                </p>
              )}
            </div>
          )}

          {/* Photo Upload Section */}
          <div className="space-y-4">
            <Label className="text-slate-300 font-medium">
              Handover Photo <span className="text-red-400">*</span>
            </Label>
            <p className="text-slate-400 text-sm">
              Attach a photo of the goods being assigned to this agent for custody tracking
            </p>
            
            {!uploadedPhoto ? (
              <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center">
                <Camera className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <label className="cursor-pointer">
                  <span className="text-blue-400 hover:text-blue-300 font-medium">Click to upload photo</span>
                  <p className="text-slate-400 text-sm mt-1">JPEG or PNG, max 10MB</p>
                  <Input
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              <div className="relative">
                <div className="border border-slate-600 rounded-lg p-4 bg-slate-700/30">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Camera className="h-5 w-5 text-green-400" />
                      <span className="text-green-400 font-medium">Photo uploaded</span>
                    </div>
                    <Button
                      type="button"
                      onClick={removePhoto}
                      size="sm"
                      variant="ghost"
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {photoPreview && (
                    <div className="mb-3">
                      <img
                        src={photoPreview}
                        alt="Handover preview"
                        className="max-w-full h-32 object-cover rounded border border-slate-500"
                      />
                    </div>
                  )}
                  
                  <p className="text-slate-300 text-sm">
                    <strong>File:</strong> {uploadedPhoto.name}
                  </p>
                  <p className="text-slate-400 text-xs">
                    Size: {(uploadedPhoto.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignment_remarks" className="text-slate-300">Assignment Remarks</Label>
            <Textarea
              id="assignment_remarks"
              value={formData.assignment_remarks}
              onChange={(e) => setFormData({ ...formData, assignment_remarks: e.target.value })}
              placeholder="Enter any assignment remarks or notes (e.g., 'Box slightly dented')"
              className="bg-slate-700 border-slate-600 text-white"
              rows={3}
            />
          </div>

          <Button
            type="submit"
            disabled={
              isSubmitting || 
              !formData.product_id || 
              !formData.delivery_agent_id || 
              !formData.quantity_to_assign || 
              !uploadedPhoto
            }
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
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

export default AssignToDASection;
