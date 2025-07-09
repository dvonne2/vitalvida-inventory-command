import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Package } from 'lucide-react';

const InventoryManagerHeader = () => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Package className="h-8 w-8 text-blue-400" />
            Enhanced Inventory Manager Portal
          </h1>
          <p className="text-slate-300 text-sm mt-1">
            AI-powered inventory management with predictive analytics and continuous optimization
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge className="bg-green-500/20 text-green-400 border-green-500">
            ● Live Stock Tracking
          </Badge>
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500">
            🧠 AI Enhanced
          </Badge>
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500">
            IM Portal
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default InventoryManagerHeader;