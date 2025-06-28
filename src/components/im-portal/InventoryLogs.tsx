
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, ArrowUp, ArrowDown, ArrowLeftRight } from 'lucide-react';

const InventoryLogs = () => {
  const inventoryLogs = [
    {
      id: 1,
      timestamp: '2025-06-28 14:30:00',
      type: 'stock_in',
      action: 'Goods Receipt',
      product: 'Fulani Shampoo',
      quantity: 100,
      from: 'Vitalvida Main Factory',
      to: 'Inventory',
      reference: 'PO-101',
      user: 'IM_USER'
    },
    {
      id: 2,
      timestamp: '2025-06-28 13:15:00',
      type: 'stock_out',
      action: 'DA Assignment',
      product: 'Pomade',
      quantity: 50,
      from: 'Inventory',
      to: 'Femi (DA123)',
      reference: 'HO-789',
      user: 'IM_USER'
    },
    {
      id: 3,
      timestamp: '2025-06-28 11:45:00',
      type: 'stock_in',
      action: 'DA Return',
      product: 'Conditioner',
      quantity: 5,
      from: 'Tobi (DA124)',
      to: 'Inventory',
      reference: 'RT-456',
      user: 'IM_USER'
    },
    {
      id: 4,
      timestamp: '2025-06-28 10:20:00',
      type: 'stock_transfer',
      action: 'DA Transfer',
      product: 'Hydration Tea',
      quantity: 3,
      from: 'Amaka (DA125)',
      to: 'Kemi (DA126)',
      reference: 'TR-123',
      user: 'IM_USER'
    },
    {
      id: 5,
      timestamp: '2025-06-28 09:00:00',
      type: 'stock_out',
      action: 'Factory Return',
      product: 'Fulani Shampoo',
      quantity: 15,
      from: 'Inventory',
      to: 'Vitalvida Main Factory',
      reference: 'FR-789',
      user: 'IM_USER'
    }
  ];

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'stock_in':
        return <ArrowUp className="h-4 w-4 text-green-400" />;
      case 'stock_out':
        return <ArrowDown className="h-4 w-4 text-red-400" />;
      case 'stock_transfer':
        return <ArrowLeftRight className="h-4 w-4 text-blue-400" />;
      default:
        return <FileText className="h-4 w-4 text-gray-400" />;
    }
  };

  const getActionBadge = (type: string) => {
    switch (type) {
      case 'stock_in':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500">Stock In</Badge>;
      case 'stock_out':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500">Stock Out</Badge>;
      case 'stock_transfer':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500">Transfer</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500">Unknown</Badge>;
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <FileText className="h-5 w-5 text-indigo-400" />
          Inventory Movement Logs
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {inventoryLogs.map((log) => (
              <div key={log.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {getActionIcon(log.type)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-white font-medium">{log.action}</h4>
                        {getActionBadge(log.type)}
                      </div>
                      <p className="text-slate-300 text-sm">
                        <strong>{log.product}</strong> - {log.quantity} units
                      </p>
                      <p className="text-slate-400 text-sm">
                        From: {log.from} → To: {log.to}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                        <span>Ref: {log.reference}</span>
                        <span>By: {log.user}</span>
                        <span>{log.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default InventoryLogs;
