import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { List, Clock, CheckCircle, XCircle, FileText } from 'lucide-react';

interface PurchaseOrder {
  id: number;
  product_name: string;
  quantity: number;
  status: 'pending' | 'approved' | 'rejected';
  approved_by?: string;
  created_at: string;
}

const PurchaseOrdersList = () => {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call - replace with actual API
    const fetchPurchaseOrders = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockData: PurchaseOrder[] = [
          {
            id: 101,
            product_name: "Fulani Shampoo",
            quantity: 200,
            status: "approved",
            approved_by: "FC_USER_NAME",
            created_at: "2025-06-28"
          },
          {
            id: 102,
            product_name: "Pomade",
            quantity: 150,
            status: "pending",
            created_at: "2025-06-27"
          },
          {
            id: 103,
            product_name: "Hydration Tea",
            quantity: 100,
            status: "rejected",
            approved_by: "FC_USER_NAME",
            created_at: "2025-06-26"
          }
        ];
        
        setPurchaseOrders(mockData);
      } catch (error) {
        console.error('Failed to fetch purchase orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchaseOrders();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case 'approved':
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto"></div>
          <p className="text-slate-400 mt-2">Loading purchase orders...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <List className="h-5 w-5 text-blue-400" />
          Purchase Orders
        </CardTitle>
      </CardHeader>
      <CardContent>
        {purchaseOrders.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-400">No POs yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-slate-300">PO ID</TableHead>
                  <TableHead className="text-slate-300">Product</TableHead>
                  <TableHead className="text-slate-300">Quantity</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-slate-300">Approved By</TableHead>
                  <TableHead className="text-slate-300">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {purchaseOrders.map((po) => (
                  <TableRow key={po.id} className="border-slate-700 hover:bg-slate-700/30">
                    <TableCell className="font-medium text-white">#{po.id}</TableCell>
                    <TableCell className="text-slate-300">{po.product_name}</TableCell>
                    <TableCell className="text-slate-300">{po.quantity}</TableCell>
                    <TableCell>{getStatusBadge(po.status)}</TableCell>
                    <TableCell className="text-slate-300">{po.approved_by || '-'}</TableCell>
                    <TableCell className="text-slate-300">{po.created_at}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PurchaseOrdersList;
