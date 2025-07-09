import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Package2, TrendingUp, TrendingDown, ArrowUpDown, AlertTriangle, Trash2 } from 'lucide-react';

const BinActivityMonitor = () => {
  const [binId, setBinId] = useState('');
  const [movements, setMovements] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [binCapacity, setBinCapacity] = useState({ current: 75, max: 100 });

  const fetchBinMovements = async () => {
    if (!binId) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/inventory/bins/${binId}/movements`);
      const data = await response.json();
      setMovements(data);
    } catch (error) {
      console.error('Failed to fetch bin movements:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getMovementIcon = (type: string) => {
    return type === 'in' ? (
      <TrendingUp className="h-4 w-4 text-green-400" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-400" />
    );
  };

  const getMovementColor = (type: string) => {
    return type === 'in' ? 'text-green-400' : 'text-red-400';
  };

  const filteredMovements = movements.filter(movement => 
    filterType === 'all' || movement.movement_type === filterType
  );

  const capacityPercentage = (binCapacity.current / binCapacity.max) * 100;
  const capacityColor = capacityPercentage > 90 ? 'text-red-400' : capacityPercentage > 70 ? 'text-yellow-400' : 'text-green-400';

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-3">
          <Package2 className="h-6 w-6 text-orange-400" />
          Bin Activity Monitor
          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500">
            Movement Tracking
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Bin Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-slate-300">Bin ID</Label>
            <Input
              placeholder="e.g., A1-01, B2-15..."
              value={binId}
              onChange={(e) => setBinId(e.target.value)}
              className="bg-slate-700/50 border-slate-600 text-white"
              onKeyDown={(e) => e.key === 'Enter' && fetchBinMovements()}
            />
          </div>
          <div className="flex items-end">
            <Button
              onClick={fetchBinMovements}
              disabled={!binId || isLoading}
              className="w-full bg-orange-600 hover:bg-orange-700"
            >
              {isLoading ? 'Loading...' : 'Load Bin Activity'}
            </Button>
          </div>
        </div>

        {/* Bin Capacity */}
        {binId && (
          <div className="p-4 bg-slate-700/30 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-medium">Bin Capacity Status</h3>
              <span className={`font-bold ${capacityColor}`}>
                {binCapacity.current}/{binCapacity.max} units
              </span>
            </div>
            <Progress value={capacityPercentage} className="h-3 mb-2" />
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Current Fill Level</span>
              <span className={capacityColor}>
                {capacityPercentage.toFixed(1)}%
              </span>
            </div>
            {capacityPercentage > 90 && (
              <div className="mt-2 flex items-center gap-2 text-red-400 text-sm">
                <AlertTriangle className="h-4 w-4" />
                Capacity Warning: Bin nearly full
              </div>
            )}
          </div>
        )}

        {/* Quick Actions */}
        {binId && (
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 border-slate-600 text-slate-300">
              <Trash2 className="h-4 w-4 mr-2" />
              Empty Bin
            </Button>
            <Button variant="outline" className="flex-1 border-slate-600 text-slate-300">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Transfer All
            </Button>
            <Button variant="outline" className="flex-1 border-slate-600 text-slate-300">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Set Alert
            </Button>
          </div>
        )}

        {/* Movement Filters */}
        {movements.length > 0 && (
          <div className="flex items-center gap-4">
            <Label className="text-slate-300">Filter by Type:</Label>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40 bg-slate-700/50 border-slate-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Movements</SelectItem>
                <SelectItem value="in">Incoming Only</SelectItem>
                <SelectItem value="out">Outgoing Only</SelectItem>
              </SelectContent>
            </Select>
            <Badge variant="outline" className="border-slate-500 text-slate-300">
              {filteredMovements.length} movements
            </Badge>
          </div>
        )}

        {/* Movement Log Table */}
        {movements.length > 0 && (
          <div className="border border-slate-600 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-600">
                  <TableHead className="text-slate-300">Item SKU</TableHead>
                  <TableHead className="text-slate-300">Type</TableHead>
                  <TableHead className="text-slate-300">Quantity</TableHead>
                  <TableHead className="text-slate-300">Timestamp</TableHead>
                  <TableHead className="text-slate-300">Running Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMovements.map((movement, index) => (
                  <TableRow key={index} className="border-slate-600">
                    <TableCell className="text-white font-medium">
                      {movement.item_sku}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getMovementIcon(movement.movement_type)}
                        <span className={getMovementColor(movement.movement_type)}>
                          {movement.movement_type.toUpperCase()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className={getMovementColor(movement.movement_type)}>
                      {movement.movement_type === 'in' ? '+' : '-'}{movement.quantity}
                    </TableCell>
                    <TableCell className="text-slate-300">
                      {new Date(movement.timestamp).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-white font-medium">
                      {movement.running_total || '--'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Visual Flow Chart Placeholder */}
        {movements.length > 0 && (
          <div className="p-4 bg-slate-700/30 rounded-lg">
            <h3 className="text-white font-medium mb-3">Movement Flow Chart</h3>
            <div className="h-32 bg-slate-800/50 rounded-lg flex items-center justify-center">
              <p className="text-slate-400">📊 Visual chart showing ins vs outs over time</p>
            </div>
          </div>
        )}

        {/* No Data State */}
        {movements.length === 0 && !isLoading && binId && (
          <div className="p-4 bg-yellow-500/20 border border-yellow-500 rounded-lg">
            <p className="text-yellow-400">No movements found for bin {binId}.</p>
            <p className="text-yellow-300 text-sm mt-1">This bin may be inactive or the ID may be incorrect.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BinActivityMonitor;