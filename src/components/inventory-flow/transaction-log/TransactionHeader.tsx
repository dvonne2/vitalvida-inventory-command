
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Download, RefreshCw, Calendar } from 'lucide-react';

interface TransactionHeaderProps {
  onRefresh: () => void;
  onExport: () => void;
  isRefreshing: boolean;
  lastRefresh: Date;
}

const TransactionHeader: React.FC<TransactionHeaderProps> = ({
  onRefresh,
  onExport,
  isRefreshing,
  lastRefresh
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <h3 className="text-indigo-400 font-semibold text-lg flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Transaction Log
        </h3>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Calendar className="h-4 w-4" />
          <span>Last updated: {lastRefresh.toLocaleTimeString()}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          onClick={onRefresh} 
          disabled={isRefreshing}
          variant="outline" 
          size="sm"
          className="text-slate-300 border-slate-600 hover:bg-slate-700"
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
        <Button onClick={onExport} className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>
    </div>
  );
};

export default TransactionHeader;
