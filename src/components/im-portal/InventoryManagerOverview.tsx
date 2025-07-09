import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeftRight } from 'lucide-react';
import BinCapacityWidget from './BinCapacityWidget';

const InventoryManagerOverview = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <BinCapacityWidget />
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <ArrowLeftRight className="h-5 w-5 text-blue-400" />
            Recent Stock Movements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <div>
                <p className="text-white font-medium">Fulani Shampoo</p>
                <p className="text-slate-400 text-sm">Assigned to DA - Femi</p>
              </div>
              <Badge className="bg-green-500/20 text-green-400">+50 units</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <div>
                <p className="text-white font-medium">Hydration Tea</p>
                <p className="text-slate-400 text-sm">Received from Factory</p>
              </div>
              <Badge className="bg-blue-500/20 text-blue-400">+100 units</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <div>
                <p className="text-white font-medium">Pomade</p>
                <p className="text-slate-400 text-sm">Returned by DA - Tobi</p>
              </div>
              <Badge className="bg-yellow-500/20 text-yellow-400">+15 units</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryManagerOverview;