
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Grid, Package, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

interface DAInventorySummary {
  da_name: string;
  location: string;
  products: {
    [key: string]: number;
  };
  total_units: number;
  status: 'healthy' | 'overstocked' | 'low' | 'inactive';
}

const DAInventoryMonitorGrid = () => {
  const [inventoryData, setInventoryData] = useState<DAInventorySummary[]>([]);
  const [loading, setLoading] = useState(true);

  const products = ['Shampoo', 'Pomade', 'Conditioner', 'Hydration Tea'];

  useEffect(() => {
    // Mock API call - replace with actual endpoint: GET /api/inventory/da-summary
    const fetchDAInventory = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockData: DAInventorySummary[] = [
          {
            da_name: 'Femi – Lagos Island',
            location: 'Lagos Island',
            products: { Shampoo: 300, Pomade: 120, Conditioner: 100, 'Hydration Tea': 80 },
            total_units: 600,
            status: 'healthy'
          },
          {
            da_name: 'Tobi – Abeokuta',
            location: 'Abeokuta',
            products: { Shampoo: 450, Pomade: 200, Conditioner: 180, 'Hydration Tea': 120 },
            total_units: 950,
            status: 'overstocked'
          },
          {
            da_name: 'Amaka – Wuse',
            location: 'Wuse, Abuja',
            products: { Shampoo: 50, Pomade: 25, Conditioner: 15, 'Hydration Tea': 10 },
            total_units: 100,
            status: 'low'
          },
          {
            da_name: 'Kemi – Victoria Island',
            location: 'Victoria Island',
            products: { Shampoo: 200, Pomade: 80, Conditioner: 60, 'Hydration Tea': 40 },
            total_units: 380,
            status: 'healthy'
          },
          {
            da_name: 'Grace – Ikeja',
            location: 'Ikeja',
            products: { Shampoo: 0, Pomade: 0, Conditioner: 0, 'Hydration Tea': 0 },
            total_units: 0,
            status: 'inactive'
          }
        ];
        
        setInventoryData(mockData);
      } catch (error) {
        console.error('Failed to fetch DA inventory summary:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDAInventory();
  }, []);

  const getStockStatus = (units: number, productName: string) => {
    // Define thresholds for different products
    const thresholds = {
      'Shampoo': { low: 50, high: 400 },
      'Pomade': { low: 30, high: 180 },
      'Conditioner': { low: 20, high: 150 },
      'Hydration Tea': { low: 15, high: 100 }
    };

    const threshold = thresholds[productName as keyof typeof thresholds] || { low: 20, high: 200 };

    if (units === 0) return 'inactive';
    if (units <= threshold.low) return 'low';
    if (units >= threshold.high) return 'overstocked';
    return 'healthy';
  };

  const getCellColor = (units: number, productName: string) => {
    const status = getStockStatus(units, productName);
    
    switch (status) {
      case 'inactive':
        return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
      case 'low':
        return 'bg-red-500/20 text-red-400 border border-red-500/30';
      case 'overstocked':
        return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
      case 'healthy':
      default:
        return 'bg-green-500/20 text-green-400 border border-green-500/30';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500">
            <TrendingUp className="w-3 h-3 mr-1" />
            Healthy
          </Badge>
        );
      case 'overstocked':
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500">
            <Package className="w-3 h-3 mr-1" />
            Overstocked
          </Badge>
        );
      case 'low':
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500">
            <TrendingDown className="w-3 h-3 mr-1" />
            Low Stock
          </Badge>
        );
      case 'inactive':
        return (
          <Badge className="bg-gray-500/20 text-gray-400 border-gray-500">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Inactive
          </Badge>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto"></div>
          <p className="text-slate-400 mt-2">Loading DA inventory grid...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Grid className="h-5 w-5 text-blue-400" />
            DA Inventory Monitor Grid
          </CardTitle>
          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-400">
              Active DAs: <span className="text-white font-medium">{inventoryData.filter(da => da.status !== 'inactive').length}</span>
            </div>
            <div className="text-sm text-slate-400">
              Total Units: <span className="text-white font-medium">{inventoryData.reduce((sum, da) => sum + da.total_units, 0)}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-300 font-semibold min-w-[200px]">Delivery Agent</TableHead>
                {products.map(product => (
                  <TableHead key={product} className="text-slate-300 font-semibold text-center min-w-[120px]">
                    {product}
                  </TableHead>
                ))}
                <TableHead className="text-slate-300 font-semibold text-center">Total Units</TableHead>
                <TableHead className="text-slate-300 font-semibold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryData.map((da, index) => (
                <TableRow key={index} className="border-slate-700 hover:bg-slate-700/30">
                  <TableCell className="font-medium text-white">
                    <div>
                      <div className="font-semibold">{da.da_name}</div>
                      <div className="text-sm text-slate-400">{da.location}</div>
                    </div>
                  </TableCell>
                  {products.map(product => {
                    const units = da.products[product] || 0;
                    return (
                      <TableCell key={product} className="text-center">
                        <div className={`px-3 py-2 rounded-lg font-medium ${getCellColor(units, product)}`}>
                          {units}
                        </div>
                      </TableCell>
                    );
                  })}
                  <TableCell className="text-center font-bold text-white">
                    {da.total_units}
                  </TableCell>
                  <TableCell>{getStatusBadge(da.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Legend */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 bg-green-500/20 border border-green-500/30 rounded"></div>
            <span className="text-slate-300">Healthy Stock</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 bg-yellow-500/20 border border-yellow-500/30 rounded"></div>
            <span className="text-slate-300">Overstocked</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 bg-red-500/20 border border-red-500/30 rounded"></div>
            <span className="text-slate-300">Low Stock</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 bg-gray-500/20 border border-gray-500/30 rounded"></div>
            <span className="text-slate-300">Inactive</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DAInventoryMonitorGrid;
