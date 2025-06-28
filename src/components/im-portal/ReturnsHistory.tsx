
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { History } from 'lucide-react';

const ReturnsHistory = () => {
  const returnsHistory = [
    {
      id: 1,
      type: 'DA Return',
      from: 'Femi',
      to: 'Inventory',
      product: 'Fulani Shampoo',
      quantity: 5,
      reason: 'Customer unavailable',
      date: '2025-06-28',
      status: 'completed'
    },
    {
      id: 2,
      type: 'Factory Return',
      from: 'Inventory',
      to: 'Factory',
      product: 'Pomade',
      quantity: 10,
      reason: 'Defective',
      date: '2025-06-27',
      status: 'pending'
    },
    {
      id: 3,
      type: 'DA Transfer',
      from: 'Tobi',
      to: 'Amaka',
      product: 'Conditioner',
      quantity: 3,
      reason: 'Route optimization',
      date: '2025-06-26',
      status: 'completed'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500">Failed</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500">Unknown</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'DA Return':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500">DA Return</Badge>;
      case 'Factory Return':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500">Factory Return</Badge>;
      case 'DA Transfer':
        return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500">DA Transfer</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500">{type}</Badge>;
    }
  };

  return (
    <Card className="bg-slate-700/30 border-slate-600">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <History className="h-5 w-5 text-orange-400" />
          Returns History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-300">Type</TableHead>
                <TableHead className="text-slate-300">From</TableHead>
                <TableHead className="text-slate-300">To</TableHead>
                <TableHead className="text-slate-300">Product</TableHead>
                <TableHead className="text-slate-300">Quantity</TableHead>
                <TableHead className="text-slate-300">Reason</TableHead>
                <TableHead className="text-slate-300">Date</TableHead>
                <TableHead className="text-slate-300">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {returnsHistory.map((record) => (
                <TableRow key={record.id} className="border-slate-700 hover:bg-slate-700/30">
                  <TableCell>{getTypeBadge(record.type)}</TableCell>
                  <TableCell className="text-slate-300">{record.from}</TableCell>
                  <TableCell className="text-slate-300">{record.to}</TableCell>
                  <TableCell className="text-slate-300">{record.product}</TableCell>
                  <TableCell className="text-slate-300">{record.quantity}</TableCell>
                  <TableCell className="text-slate-300">{record.reason}</TableCell>
                  <TableCell className="text-slate-300">{record.date}</TableCell>
                  <TableCell>{getStatusBadge(record.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReturnsHistory;
