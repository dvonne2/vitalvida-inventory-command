
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Package, AlertTriangle } from 'lucide-react';

interface ProductInventory {
  shampoo: number;
  pomade: number;
  conditioner: number;
  hydrationTea: number;
}

interface DAInventoryData {
  id: string;
  name: string;
  location: string;
  inventory: ProductInventory;
  totalUnits: number;
  status: 'healthy' | 'low' | 'critical';
}

const DAInventoryView = () => {
  const [daInventory, setDaInventory] = useState<DAInventoryData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call - replace with actual API
    const fetchDAInventory = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data representing what each DA currently has
        const mockData: DAInventoryData[] = [
          {
            id: '1',
            name: 'John',
            location: 'Lagos Island',
            inventory: {
              shampoo: 100,
              pomade: 50,
              conditioner: 30,
              hydrationTea: 10
            },
            totalUnits: 190,
            status: 'healthy'
          },
          {
            id: '2',
            name: 'Grace',
            location: 'Ikeja',
            inventory: {
              shampoo: 80,
              pomade: 20,
              conditioner: 10,
              hydrationTea: 5
            },
            totalUnits: 115,
            status: 'healthy'
          },
          {
            id: '3',
            name: 'Femi',
            location: 'Victoria Island',
            inventory: {
              shampoo: 15,
              pomade: 8,
              conditioner: 5,
              hydrationTea: 2
            },
            totalUnits: 30,
            status: 'low'
          },
          {
            id: '4',
            name: 'Amaka',
            location: 'Wuse, Abuja',
            inventory: {
              shampoo: 5,
              pomade: 2,
              conditioner: 1,
              hydrationTea: 0
            },
            totalUnits: 8,
            status: 'critical'
          },
          {
            id: '5',
            name: 'Tobi',
            location: 'Abeokuta',
            inventory: {
              shampoo: 60,
              pomade: 45,
              conditioner: 25,
              hydrationTea: 15
            },
            totalUnits: 145,
            status: 'healthy'
          },
          {
            id: '6',
            name: 'Kemi',
            location: 'Ibadan',
            inventory: {
              shampoo: 25,
              pomade: 12,
              conditioner: 8,
              hydrationTea: 3
            },
            totalUnits: 48,
            status: 'low'
          }
        ];
        
        setDaInventory(mockData);
      } catch (error) {
        console.error('Failed to fetch DA inventory:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDAInventory();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500">
            Healthy
          </Badge>
        );
      case 'low':
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500">
            Low Stock
          </Badge>
        );
      case 'critical':
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500">
            Critical
          </Badge>
        );
      default:
        return null;
    }
  };

  const getCellColor = (value: number, productType: string) => {
    // Color coding based on stock levels
    if (value === 0) return 'text-red-400 bg-red-500/10';
    if (value <= 5) return 'text-yellow-400 bg-yellow-500/10';
    if (value <= 15) return 'text-orange-400 bg-orange-500/10';
    return 'text-green-400 bg-green-500/10';
  };

  if (loading) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto"></div>
          <p className="text-slate-400 mt-2">Loading DA inventory...</p>
        </CardContent>
      </Card>
    );
  }

  const totalInventory = daInventory.reduce((acc, da) => ({
    shampoo: acc.shampoo + da.inventory.shampoo,
    pomade: acc.pomade + da.inventory.pomade,
    conditioner: acc.conditioner + da.inventory.conditioner,
    hydrationTea: acc.hydrationTea + da.inventory.hydrationTea,
  }), { shampoo: 0, pomade: 0, conditioner: 0, hydrationTea: 0 });

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-400" />
            Delivery Agent Inventory View
          </CardTitle>
          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-400">
              Total DAs: <span className="text-white font-medium">{daInventory.length}</span>
            </div>
            <div className="text-sm text-slate-400">
              Total Units: <span className="text-white font-medium">{daInventory.reduce((sum, da) => sum + da.totalUnits, 0)}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-300 font-semibold">Delivery Agent</TableHead>
                <TableHead className="text-slate-300 font-semibold">Location</TableHead>
                <TableHead className="text-slate-300 font-semibold text-center">Shampoo</TableHead>
                <TableHead className="text-slate-300 font-semibold text-center">Pomade</TableHead>
                <TableHead className="text-slate-300 font-semibold text-center">Conditioner</TableHead>
                <TableHead className="text-slate-300 font-semibold text-center">Hydration Tea</TableHead>
                <TableHead className="text-slate-300 font-semibold text-center">Total Units</TableHead>
                <TableHead className="text-slate-300 font-semibold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {daInventory.map((da) => (
                <TableRow key={da.id} className="border-slate-700 hover:bg-slate-700/30">
                  <TableCell className="font-medium text-white">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-blue-400" />
                      DA - {da.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-300">{da.location}</TableCell>
                  <TableCell className={`text-center font-medium rounded px-2 py-1 ${getCellColor(da.inventory.shampoo, 'shampoo')}`}>
                    {da.inventory.shampoo}
                  </TableCell>
                  <TableCell className={`text-center font-medium rounded px-2 py-1 ${getCellColor(da.inventory.pomade, 'pomade')}`}>
                    {da.inventory.pomade}
                  </TableCell>
                  <TableCell className={`text-center font-medium rounded px-2 py-1 ${getCellColor(da.inventory.conditioner, 'conditioner')}`}>
                    {da.inventory.conditioner}
                  </TableCell>
                  <TableCell className={`text-center font-medium rounded px-2 py-1 ${getCellColor(da.inventory.hydrationTea, 'hydrationTea')}`}>
                    {da.inventory.hydrationTea}
                  </TableCell>
                  <TableCell className="text-center font-bold text-white">
                    {da.totalUnits}
                  </TableCell>
                  <TableCell>{getStatusBadge(da.status)}</TableCell>
                </TableRow>
              ))}
              {/* Totals Row */}
              <TableRow className="border-slate-700 bg-slate-700/20 font-bold">
                <TableCell className="text-blue-400 font-bold">TOTALS</TableCell>
                <TableCell className="text-slate-400">All Locations</TableCell>
                <TableCell className="text-center text-white bg-blue-500/20 rounded px-2 py-1">
                  {totalInventory.shampoo}
                </TableCell>
                <TableCell className="text-center text-white bg-blue-500/20 rounded px-2 py-1">
                  {totalInventory.pomade}
                </TableCell>
                <TableCell className="text-center text-white bg-blue-500/20 rounded px-2 py-1">
                  {totalInventory.conditioner}
                </TableCell>
                <TableCell className="text-center text-white bg-blue-500/20 rounded px-2 py-1">
                  {totalInventory.hydrationTea}
                </TableCell>
                <TableCell className="text-center text-blue-400 font-bold">
                  {daInventory.reduce((sum, da) => sum + da.totalUnits, 0)}
                </TableCell>
                <TableCell>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500">
                    Summary
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-700/30 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-slate-300 text-sm">Healthy Stock</span>
            </div>
            <p className="text-2xl font-bold text-green-400 mt-1">
              {daInventory.filter(da => da.status === 'healthy').length} DAs
            </p>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-slate-300 text-sm">Low Stock</span>
            </div>
            <p className="text-2xl font-bold text-yellow-400 mt-1">
              {daInventory.filter(da => da.status === 'low').length} DAs
            </p>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-slate-300 text-sm">Critical Stock</span>
            </div>
            <p className="text-2xl font-bold text-red-400 mt-1">
              {daInventory.filter(da => da.status === 'critical').length} DAs
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DAInventoryView;
