
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface InventoryHeaderProps {
  lastRefresh: Date;
  autoRefresh: boolean;
  setAutoRefresh: (value: boolean) => void;
  handleRefresh: () => void;
}

const InventoryHeader = ({ lastRefresh, autoRefresh, setAutoRefresh, handleRefresh }: InventoryHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Live DA Inventory & Nigeria Map Overview</h2>
        <p className="text-slate-300 text-sm">
          Real-time stock levels per DA • Last updated: {lastRefresh.toLocaleTimeString()}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Badge 
          variant={autoRefresh ? "default" : "secondary"} 
          className="cursor-pointer"
          onClick={() => setAutoRefresh(!autoRefresh)}
        >
          {autoRefresh ? '🔄 Auto-refresh ON' : '⏸️ Auto-refresh OFF'}
        </Badge>
        <Button onClick={handleRefresh} variant="outline" size="sm" className="text-slate-300 border-slate-600">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Now
        </Button>
      </div>
    </div>
  );
};

export default InventoryHeader;
