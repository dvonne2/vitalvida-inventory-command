
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, TruckIcon, ArrowRightLeft, FileText, Plus, Download } from 'lucide-react';
import ReceiveStockSection from '@/components/inventory-flow/ReceiveStockSection';
import AssignToDASection from '@/components/inventory-flow/AssignToDASection';
import DAReturnsTab from '@/components/inventory-flow/DAReturnsTab';
import TransferBetweenDAsTab from '@/components/inventory-flow/TransferBetweenDAsTab';
import ReturnToFactoryTab from '@/components/inventory-flow/ReturnToFactoryTab';
import TransactionLogTab from '@/components/inventory-flow/TransactionLogTab';

const InventoryStockFlow = () => {
  const [stockCounts, setStockCounts] = useState({
    totalStock: 2485,
    pendingReceipts: 350,
    assignedToDA: 1890,
    returnsProcessed: 85
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <Package className="h-10 w-10 text-blue-400" />
                Inventory Stock Flow
              </h1>
              <p className="text-slate-300 text-lg mt-2">
                Manage stock receipts, assignments, and transfers
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-green-500/20 text-green-400 border-green-500 text-sm px-3 py-1">
                ● Live Stock Tracking
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500 text-sm px-3 py-1">
                Inventory Manager
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Real-time Stock Counters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">Total Stock</p>
                  <p className="text-3xl font-bold text-white">{stockCounts.totalStock.toLocaleString()}</p>
                </div>
                <Package className="h-10 w-10 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">Pending Receipts</p>
                  <p className="text-3xl font-bold text-green-400">{stockCounts.pendingReceipts}</p>
                </div>
                <Plus className="h-10 w-10 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">Assigned to DAs</p>
                  <p className="text-3xl font-bold text-blue-400">{stockCounts.assignedToDA.toLocaleString()}</p>
                </div>
                <TruckIcon className="h-10 w-10 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">Returns Processed</p>
                  <p className="text-3xl font-bold text-orange-400">{stockCounts.returnsProcessed}</p>
                </div>
                <ArrowRightLeft className="h-10 w-10 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Section 1: Receive Stock from Factory */}
        <ReceiveStockSection onStockUpdate={setStockCounts} />

        {/* Section 2: Assign to Delivery Agent */}
        <AssignToDASection onStockUpdate={setStockCounts} />

        {/* Section 3: Returns, Transfers, Logs */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-3">
              <FileText className="h-6 w-6 text-purple-400" />
              Returns, Transfers & Logs
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs defaultValue="da-returns" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-slate-700/50">
                <TabsTrigger 
                  value="da-returns" 
                  className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                >
                  DA Returns
                </TabsTrigger>
                <TabsTrigger 
                  value="transfers" 
                  className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                >
                  Transfer Between DAs
                </TabsTrigger>
                <TabsTrigger 
                  value="factory-returns" 
                  className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white"
                >
                  Return to Factory
                </TabsTrigger>
                <TabsTrigger 
                  value="transaction-log" 
                  className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
                >
                  Transaction Log
                </TabsTrigger>
              </TabsList>

              <TabsContent value="da-returns">
                <DAReturnsTab onStockUpdate={setStockCounts} />
              </TabsContent>

              <TabsContent value="transfers">
                <TransferBetweenDAsTab onStockUpdate={setStockCounts} />
              </TabsContent>

              <TabsContent value="factory-returns">
                <ReturnToFactoryTab onStockUpdate={setStockCounts} />
              </TabsContent>

              <TabsContent value="transaction-log">
                <TransactionLogTab />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InventoryStockFlow;
