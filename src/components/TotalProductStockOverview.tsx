
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Package, TrendingUp, AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductStock {
  id: string;
  product_name: string;
  total_stock: number;
  in_depot: number;
  with_agents: number;
  low_stock_threshold: number;
  status: 'healthy' | 'low' | 'critical';
}

const TotalProductStockOverview = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock data - replace with actual API call
  const [productStocks] = useState<ProductStock[]>([
    {
      id: '1',
      product_name: 'Fulani Shampoo',
      total_stock: 850,
      in_depot: 320,
      with_agents: 530,
      low_stock_threshold: 100,
      status: 'healthy'
    },
    {
      id: '2',
      product_name: 'Hydration Tea',
      total_stock: 120,
      in_depot: 45,
      with_agents: 75,
      low_stock_threshold: 150,
      status: 'low'
    },
    {
      id: '3',
      product_name: 'Hair Pomade',
      total_stock: 45,
      in_depot: 15,
      with_agents: 30,
      low_stock_threshold: 50,
      status: 'critical'
    },
    {
      id: '4',
      product_name: 'Body Lotion',
      total_stock: 680,
      in_depot: 280,
      with_agents: 400,
      low_stock_threshold: 100,
      status: 'healthy'
    },
    {
      id: '5',
      product_name: 'Face Cream',
      total_stock: 95,
      in_depot: 35,
      with_agents: 60,
      low_stock_threshold: 80,
      status: 'low'
    }
  ]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Mock API call - replace with actual endpoint: GET /api/product-stocks
    console.log('Refreshing product stock data...');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-500/20 text-green-400 border-green-500';
      case 'low': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500';
    }
  };

  const totalProducts = productStocks.length;
  const lowStockCount = productStocks.filter(p => p.status === 'low' || p.status === 'critical').length;
  const totalUnits = productStocks.reduce((sum, product) => sum + product.total_stock, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-3">
              <Package className="h-6 w-6 text-blue-400" />
              Total Product Stock Overview
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500 ml-2">
                {totalProducts} Products
              </Badge>
            </CardTitle>
            <Button
              onClick={handleRefresh}
              disabled={isRefreshing}
              variant="outline"
              size="sm"
              className="text-slate-300 border-slate-600 hover:bg-slate-700"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Units</p>
                <p className="text-2xl font-bold text-blue-400">{totalUnits.toLocaleString()}</p>
              </div>
              <Package className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Low Stock Alerts</p>
                <p className="text-2xl font-bold text-yellow-400">{lowStockCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Stock Efficiency</p>
                <p className="text-2xl font-bold text-green-400">92%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product Stock Table */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-lg">Product Stock Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-slate-300">Product</TableHead>
                  <TableHead className="text-slate-300">Total Stock</TableHead>
                  <TableHead className="text-slate-300">In Depot</TableHead>
                  <TableHead className="text-slate-300">With Agents</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productStocks.map((product) => (
                  <TableRow key={product.id} className="border-slate-700 hover:bg-slate-700/30">
                    <TableCell className="text-white font-medium">
                      {product.product_name}
                    </TableCell>
                    <TableCell className="text-white">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold">{product.total_stock}</span>
                        <span className="text-slate-400 text-sm">units</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300">
                      <div className="flex items-center gap-2">
                        <span>{product.in_depot}</span>
                        <div className="w-12 bg-slate-700 rounded-full h-2">
                          <div 
                            className="bg-blue-400 h-2 rounded-full"
                            style={{ 
                              width: `${(product.in_depot / product.total_stock) * 100}%` 
                            }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300">
                      <div className="flex items-center gap-2">
                        <span>{product.with_agents}</span>
                        <div className="w-12 bg-slate-700 rounded-full h-2">
                          <div 
                            className="bg-green-400 h-2 rounded-full"
                            style={{ 
                              width: `${(product.with_agents / product.total_stock) * 100}%` 
                            }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(product.status)}>
                        {product.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TotalProductStockOverview;
