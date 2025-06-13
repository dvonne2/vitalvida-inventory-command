
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Package, MapPin, AlertTriangle } from 'lucide-react';

interface DAInventory {
  id: string;
  name: string;
  location: string;
  state: string;
  shampoo: number;
  pomade: number;
  conditioner: number;
  hydrationTea: number;
  unitsTotal: number;
  daysLeft: number;
  lastUpdated: Date;
}

interface LiveInventoryTabProps {
  inventoryData: DAInventory[];
}

const LiveInventoryTab = ({ inventoryData }: LiveInventoryTabProps) => {
  const getDaysLeftColor = (daysLeft: number) => {
    if (daysLeft < 2) return 'text-red-500 bg-red-100';
    if (daysLeft <= 5) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getStockLevelColor = (quantity: number) => {
    if (quantity === 0) return 'text-red-500';
    if (quantity < 3) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Package className="h-5 w-5 text-blue-400" />
          Live DA Inventory (SKU Level)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-300">DA Name</TableHead>
                <TableHead className="text-slate-300">Location</TableHead>
                <TableHead className="text-slate-300 text-center">Shampoo</TableHead>
                <TableHead className="text-slate-300 text-center">Pomade</TableHead>
                <TableHead className="text-slate-300 text-center">Conditioner</TableHead>
                <TableHead className="text-slate-300 text-center">Hydration Tea</TableHead>
                <TableHead className="text-slate-300 text-center">Total Units</TableHead>
                <TableHead className="text-slate-300 text-center">Days Left</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryData.map((da) => (
                <TableRow key={da.id} className="border-slate-700 hover:bg-slate-700/30">
                  <TableCell className="font-medium text-white">{da.name}</TableCell>
                  <TableCell className="text-slate-300">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {da.location}, {da.state}
                    </div>
                  </TableCell>
                  <TableCell className={`text-center font-medium ${getStockLevelColor(da.shampoo)}`}>
                    {da.shampoo}
                  </TableCell>
                  <TableCell className={`text-center font-medium ${getStockLevelColor(da.pomade)}`}>
                    {da.pomade}
                  </TableCell>
                  <TableCell className={`text-center font-medium ${getStockLevelColor(da.conditioner)}`}>
                    {da.conditioner}
                  </TableCell>
                  <TableCell className={`text-center font-medium ${getStockLevelColor(da.hydrationTea)}`}>
                    {da.hydrationTea}
                  </TableCell>
                  <TableCell className="text-center font-medium text-white">{da.unitsTotal}</TableCell>
                  <TableCell className="text-center">
                    <Badge className={`${getDaysLeftColor(da.daysLeft)} border-0`}>
                      {da.daysLeft < 2 && <AlertTriangle className="h-3 w-3 mr-1" />}
                      {da.daysLeft} days
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveInventoryTab;
