import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Package, Scan, MapPin, ArrowRight, Bell } from 'lucide-react';

const ItemJourneyTracker = () => {
  const [sku, setSku] = useState('');
  const [movements, setMovements] = useState<any[]>([]);
  const [currentLocations, setCurrentLocations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchItemMovements = async () => {
    if (!sku) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/inventory/items/${sku}/movements`);
      const data = await response.json();
      setMovements(data);
      
      // Mock current locations data
      setCurrentLocations([
        { bin: 'A1-01', quantity: 45 },
        { bin: 'B2-05', quantity: 23 },
        { bin: 'STAGING', quantity: 12 }
      ]);
    } catch (error) {
      console.error('Failed to fetch item movements:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getReasonColor = (reason: string) => {
    switch (reason?.toLowerCase()) {
      case 'restocking': return 'bg-green-500/20 text-green-400 border-green-500';
      case 'order_fulfillment': return 'bg-blue-500/20 text-blue-400 border-blue-500';
      case 'relocation': return 'bg-purple-500/20 text-purple-400 border-purple-500';
      case 'maintenance': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500';
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-3">
          <Package className="h-6 w-6 text-indigo-400" />
          Item Journey Tracker
          <Badge className="bg-indigo-500/20 text-indigo-400 border-indigo-500">
            Movement History
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* SKU Search */}
        <div className="flex gap-2">
          <div className="flex-1">
            <Label className="text-slate-300">Item SKU</Label>
            <Input
              placeholder="Enter SKU to track item journey..."
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="bg-slate-700/50 border-slate-600 text-white"
              onKeyDown={(e) => e.key === 'Enter' && fetchItemMovements()}
            />
          </div>
          <div className="flex items-end gap-2">
            <Button
              onClick={fetchItemMovements}
              disabled={!sku || isLoading}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {isLoading ? 'Tracking...' : 'Track Item'}
            </Button>
            <Button variant="outline" size="icon" className="border-slate-600">
              <Scan className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Current Locations Summary */}
        {currentLocations.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-white font-medium flex items-center gap-2">
              <MapPin className="h-5 w-5 text-indigo-400" />
              Current Locations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {currentLocations.map((location, index) => (
                <div key={index} className="p-3 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">{location.bin}</span>
                    <Badge variant="outline" className="border-indigo-500 text-indigo-400">
                      {location.quantity} units
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Bell className="h-4 w-4" />
              <span>Total available: {currentLocations.reduce((sum, loc) => sum + loc.quantity, 0)} units across {currentLocations.length} locations</span>
            </div>
          </div>
        )}

        {/* Interactive Warehouse Map Placeholder */}
        {movements.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-white font-medium">Item Path Visualization</h3>
            <div className="p-6 bg-slate-700/30 rounded-lg">
              <div className="h-48 bg-slate-800/50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Package className="h-12 w-12 text-indigo-400 mx-auto mb-2" />
                  <p className="text-slate-400">🗺️ Interactive warehouse map showing item journey</p>
                  <p className="text-slate-500 text-sm mt-1">Visual path with animated flow between bins</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Movement Timeline */}
        {movements.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-medium">Movement Timeline</h3>
              <Badge className="bg-indigo-500/20 text-indigo-400 border-indigo-500">
                {movements.length} movements
              </Badge>
            </div>
            
            <div className="border border-slate-600 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-600">
                    <TableHead className="text-slate-300">From</TableHead>
                    <TableHead className="text-slate-300"></TableHead>
                    <TableHead className="text-slate-300">To</TableHead>
                    <TableHead className="text-slate-300">Quantity</TableHead>
                    <TableHead className="text-slate-300">Reason</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {movements.map((movement, index) => (
                    <TableRow key={index} className="border-slate-600">
                      <TableCell className="text-white font-medium">
                        {movement.bin_from || 'RECEIVING'}
                      </TableCell>
                      <TableCell>
                        <ArrowRight className="h-4 w-4 text-slate-400" />
                      </TableCell>
                      <TableCell className="text-white font-medium">
                        {movement.bin_to || 'SHIPPING'}
                      </TableCell>
                      <TableCell className="text-blue-400">
                        {movement.quantity} units
                      </TableCell>
                      <TableCell>
                        <Badge className={getReasonColor(movement.reason)}>
                          {movement.reason?.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={movement.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}>
                          {movement.status?.toUpperCase()}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {/* Predictive Alerts */}
        {sku && (
          <div className="p-4 bg-blue-500/20 border border-blue-500 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Bell className="h-5 w-5 text-blue-400" />
              <span className="text-blue-400 font-medium">Predictive Movement Alert</span>
            </div>
            <p className="text-blue-300 text-sm">
              Based on current patterns, this item is likely to be moved from A1-01 to STAGING within the next 2 hours.
            </p>
          </div>
        )}

        {/* No Data State */}
        {movements.length === 0 && !isLoading && sku && (
          <div className="p-4 bg-yellow-500/20 border border-yellow-500 rounded-lg">
            <p className="text-yellow-400">No movement history found for SKU: {sku}</p>
            <p className="text-yellow-300 text-sm mt-1">This item may be new or the SKU may be incorrect.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ItemJourneyTracker;