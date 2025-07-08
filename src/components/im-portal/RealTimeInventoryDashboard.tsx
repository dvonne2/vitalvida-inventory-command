
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Eye, Activity, Truck, Users, TrendingUp, AlertCircle, RefreshCw } from 'lucide-react';

interface RealTimeData {
  da: string;
  location: string;
  totalStock: number;
  salesVelocity: number;
  lastUpdate: Date;
  products: {
    name: string;
    stock: number;
    velocity: number;
    status: 'healthy' | 'low' | 'critical';
  }[];
  restockStatus: 'none' | 'requested' | 'in_transit' | 'delivered';
}

const RealTimeInventoryDashboard = () => {
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const [realTimeData] = useState<RealTimeData[]>([
    {
      da: 'Femi',
      location: 'Lagos',
      totalStock: 85,
      salesVelocity: 12.5,
      lastUpdate: new Date(),
      products: [
        { name: 'Shampoo', stock: 25, velocity: 4.2, status: 'healthy' },
        { name: 'Pomade', stock: 8, velocity: 2.1, status: 'low' },
        { name: 'Conditioner', stock: 35, velocity: 3.8, status: 'healthy' },
        { name: 'Tea', stock: 17, velocity: 2.4, status: 'healthy' }
      ],
      restockStatus: 'in_transit'
    },
    {
      da: 'Amaka',
      location: 'Abuja',
      totalStock: 120,
      salesVelocity: 15.8,
      lastUpdate: new Date(Date.now() - 300000), // 5 minutes ago
      products: [
        { name: 'Shampoo', stock: 45, velocity: 5.2, status: 'healthy' },
        { name: 'Pomade', stock: 3, velocity: 3.1, status: 'critical' },
        { name: 'Conditioner', stock: 42, velocity: 4.5, status: 'healthy' },
        { name: 'Tea', stock: 30, velocity: 3.0, status: 'healthy' }
      ],
      restockStatus: 'requested'
    },
    {
      da: 'Chidi',
      location: 'Port Harcourt',
      totalStock: 45,
      salesVelocity: 8.3,
      lastUpdate: new Date(Date.now() - 900000), // 15 minutes ago
      products: [
        { name: 'Shampoo', stock: 12, velocity: 2.8, status: 'low' },
        { name: 'Pomade', stock: 15, velocity: 2.5, status: 'healthy' },
        { name: 'Conditioner', stock: 8, velocity: 1.8, status: 'low' },
        { name: 'Tea', stock: 10, velocity: 1.2, status: 'healthy' }
      ],
      restockStatus: 'delivered'
    }
  ]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLastRefresh(new Date());
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

  const getRestockStatusColor = (status: string) => {
    switch (status) {
      case 'none': return 'bg-gray-500/20 text-gray-400';
      case 'requested': return 'bg-blue-500/20 text-blue-400';
      case 'in_transit': return 'bg-orange-500/20 text-orange-400';
      case 'delivered': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const totalDAs = realTimeData.length;
  const activeDAs = realTimeData.filter(da => (Date.now() - da.lastUpdate.getTime()) < 600000).length; // Active in last 10 minutes
  const totalStock = realTimeData.reduce((sum, da) => sum + da.totalStock, 0);
  const avgVelocity = Math.round((realTimeData.reduce((sum, da) => sum + da.salesVelocity, 0) / totalDAs) * 10) / 10;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-3">
              <Eye className="h-6 w-6 text-cyan-400" />
              Real-Time Inventory Visibility
              <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500">
                Live Updates
              </Badge>
            </CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-sm">
                Last update: {lastRefresh.toLocaleTimeString()}
              </span>
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
          </div>
        </CardHeader>
      </Card>

      {/* Real-Time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Active DAs</p>
                <p className="text-2xl font-bold text-green-400">{activeDAs}/{totalDAs}</p>
              </div>
              <Activity className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Stock</p>
                <p className="text-2xl font-bold text-blue-400">{totalStock}</p>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Avg Velocity</p>
                <p className="text-2xl font-bold text-purple-400">{avgVelocity}/day</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">In Transit</p>
                <p className="text-2xl font-bold text-orange-400">
                  {realTimeData.filter(da => da.restockStatus === 'in_transit').length}
                </p>
              </div>
              <Truck className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-Time DA Overview */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-lg flex items-center gap-2">
            <Activity className="h-5 w-5 text-cyan-400" />
            Live DA Inventory Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {realTimeData.map((da, index) => {
              const isActive = (Date.now() - da.lastUpdate.getTime()) < 600000;
              const criticalProducts = da.products.filter(p => p.status === 'critical').length;
              const lowProducts = da.products.filter(p => p.status === 'low').length;
              
              return (
                <div key={index} className="bg-slate-700/30 rounded-lg p-4">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-400' : 'bg-red-400'}`}></div>
                        <h4 className="text-white font-medium">{da.da}</h4>
                        <Badge className="bg-slate-600/50 text-slate-300 text-xs">
                          {da.location}
                        </Badge>
                      </div>
                      <p className="text-slate-400 text-sm">
                        Updated: {Math.round((Date.now() - da.lastUpdate.getTime()) / 60000)}m ago
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-slate-400 text-sm mb-2">Stock Overview</p>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-white">Total: {da.totalStock}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400 text-sm">Velocity: {da.salesVelocity}/day</span>
                        </div>
                        <Progress value={(da.totalStock / 150) * 100} className="h-2" />
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-slate-400 text-sm mb-2">Product Health</p>
                      <div className="grid grid-cols-2 gap-2">
                        {da.products.map((product, pIndex) => (
                          <div key={pIndex} className="text-xs">
                            <div className="flex items-center justify-between">
                              <span className="text-slate-300">{product.name.substring(0, 4)}</span>
                              <Badge className={`${getStatusColor(product.status)} text-xs`}>
                                {product.stock}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                      {(criticalProducts > 0 || lowProducts > 0) && (
                        <div className="flex items-center gap-1 mt-2">
                          <AlertCircle className="h-3 w-3 text-yellow-400" />
                          <span className="text-xs text-yellow-400">
                            {criticalProducts > 0 && `${criticalProducts} critical`}
                            {criticalProducts > 0 && lowProducts > 0 && ', '}
                            {lowProducts > 0 && `${lowProducts} low`}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <p className="text-slate-400 text-sm mb-2">Restock Status</p>
                      <Badge className={getRestockStatusColor(da.restockStatus)}>
                        {da.restockStatus.replace('_', ' ').toUpperCase()}
                      </Badge>
                      {da.restockStatus === 'in_transit' && (
                        <p className="text-xs text-orange-400 mt-1">ETA: 2-3 hours</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealTimeInventoryDashboard;
