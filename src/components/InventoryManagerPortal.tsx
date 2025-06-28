
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, FileText, Truck, Users, ArrowLeftRight, RotateCcw, Factory } from 'lucide-react';
import PurchaseOrderForm from './im-portal/PurchaseOrderForm';
import PurchaseOrdersList from './im-portal/PurchaseOrdersList';
import GoodsReceiptForm from './im-portal/GoodsReceiptForm';
import DAAssignmentForm from './im-portal/DAAssignmentForm';
import ReturnsDashboard from './im-portal/ReturnsDashboard';
import InventoryLogs from './im-portal/InventoryLogs';
import BinCapacityWidget from './im-portal/BinCapacityWidget';

const InventoryManagerPortal = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Package className="h-8 w-8 text-blue-400" />
              Inventory Manager Portal
            </h1>
            <p className="text-slate-300 text-sm mt-1">
              Central hub for stock movement, purchase orders, and DA management
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-green-500/20 text-green-400 border-green-500">
              ● Live Stock Tracking
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500">
              IM Portal
            </Badge>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Pending POs</p>
                <p className="text-2xl font-bold text-yellow-400">5</p>
              </div>
              <FileText className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Active DAs</p>
                <p className="text-2xl font-bold text-blue-400">12</p>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Stock in Transit</p>
                <p className="text-2xl font-bold text-orange-400">243</p>
              </div>
              <Truck className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Bin Capacity</p>
                <p className="text-2xl font-bold text-green-400">67%</p>
              </div>
              <Package className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="w-full overflow-x-auto">
          <TabsList className="inline-flex h-10 items-center justify-start rounded-md bg-slate-800/50 border border-slate-700 p-1 text-muted-foreground min-w-max">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              📊 Overview
            </TabsTrigger>
            <TabsTrigger value="purchase-orders" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
              📋 Purchase Orders
            </TabsTrigger>
            <TabsTrigger value="goods-receipt" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              📦 Goods Receipt
            </TabsTrigger>
            <TabsTrigger value="da-assignment" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              👥 DA Assignment
            </TabsTrigger>
            <TabsTrigger value="returns" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
              🔄 Returns
            </TabsTrigger>
            <TabsTrigger value="inventory-logs" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white">
              📝 Inventory Logs
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BinCapacityWidget />
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <ArrowLeftRight className="h-5 w-5 text-blue-400" />
                  Recent Stock Movements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Fulani Shampoo</p>
                      <p className="text-slate-400 text-sm">Assigned to DA - Femi</p>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400">+50 units</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Hydration Tea</p>
                      <p className="text-slate-400 text-sm">Received from Factory</p>
                    </div>
                    <Badge className="bg-blue-500/20 text-blue-400">+100 units</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Pomade</p>
                      <p className="text-slate-400 text-sm">Returned by DA - Tobi</p>
                    </div>
                    <Badge className="bg-yellow-500/20 text-yellow-400">+15 units</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="purchase-orders" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PurchaseOrderForm />
            <PurchaseOrdersList />
          </div>
        </TabsContent>

        <TabsContent value="goods-receipt" className="space-y-4">
          <GoodsReceiptForm />
        </TabsContent>

        <TabsContent value="da-assignment" className="space-y-4">
          <DAAssignmentForm />
        </TabsContent>

        <TabsContent value="returns" className="space-y-4">
          <ReturnsDashboard />
        </TabsContent>

        <TabsContent value="inventory-logs" className="space-y-4">
          <InventoryLogs />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InventoryManagerPortal;
