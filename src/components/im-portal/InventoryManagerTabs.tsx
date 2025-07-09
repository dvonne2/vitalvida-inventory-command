import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PurchaseOrderForm from './PurchaseOrderForm';
import PurchaseOrdersList from './PurchaseOrdersList';
import GoodsReceiptForm from './GoodsReceiptForm';
import DAAssignmentForm from './DAAssignmentForm';
import ReturnsDashboard from './ReturnsDashboard';
import InventoryLogs from './InventoryLogs';
import DAInventoryView from './DAInventoryView';
import DAInventoryMonitorGrid from './DAInventoryMonitorGrid';
import DamagedProductTracker from '../DamagedProductTracker';
import PredictiveAnalyticsDashboard from './PredictiveAnalyticsDashboard';
import AutomatedReplenishmentSystem from './AutomatedReplenishmentSystem';
import RealTimeInventoryDashboard from './RealTimeInventoryDashboard';
import LogisticsOptimization from './LogisticsOptimization';
import ContinuousImprovementSystem from './ContinuousImprovementSystem';
import OperationsHub from './operational-panels/OperationsHub';
import InventoryManagerOverview from './InventoryManagerOverview';

interface InventoryManagerTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const InventoryManagerTabs: React.FC<InventoryManagerTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <div className="w-full overflow-x-auto">
        <TabsList className="inline-flex h-10 items-center justify-start rounded-md bg-slate-800/50 border border-slate-700 p-1 text-muted-foreground min-w-max">
          <TabsTrigger value="overview" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            📊 Overview
          </TabsTrigger>
          <TabsTrigger value="predictive-analytics" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            🧠 Predictive Analytics
          </TabsTrigger>
          <TabsTrigger value="auto-replenishment" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            ⚡ Auto Replenishment
          </TabsTrigger>
          <TabsTrigger value="real-time-visibility" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
            👁️ Real-Time Visibility
          </TabsTrigger>
          <TabsTrigger value="logistics-optimization" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white">
            🚛 Logistics Optimization
          </TabsTrigger>
          <TabsTrigger value="continuous-improvement" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
            📈 Continuous Improvement
          </TabsTrigger>
          <TabsTrigger value="operations-hub" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
            🎯 Operations Hub
          </TabsTrigger>
          <TabsTrigger value="da-inventory" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
            👥 DA Inventory
          </TabsTrigger>
          <TabsTrigger value="da-monitor" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            📋 DA Monitor Grid
          </TabsTrigger>
          <TabsTrigger value="damaged-stock" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
            ⚠️ Damaged Stock
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
        <InventoryManagerOverview />
      </TabsContent>

      <TabsContent value="predictive-analytics" className="space-y-4">
        <PredictiveAnalyticsDashboard />
      </TabsContent>

      <TabsContent value="auto-replenishment" className="space-y-4">
        <AutomatedReplenishmentSystem />
      </TabsContent>

      <TabsContent value="real-time-visibility" className="space-y-4">
        <RealTimeInventoryDashboard />
      </TabsContent>

      <TabsContent value="logistics-optimization" className="space-y-4">
        <LogisticsOptimization />
      </TabsContent>

      <TabsContent value="continuous-improvement" className="space-y-4">
        <ContinuousImprovementSystem />
      </TabsContent>

      <TabsContent value="operations-hub" className="space-y-4">
        <OperationsHub />
      </TabsContent>

      <TabsContent value="da-inventory" className="space-y-4">
        <DAInventoryView />
      </TabsContent>

      <TabsContent value="da-monitor" className="space-y-4">
        <DAInventoryMonitorGrid />
      </TabsContent>

      <TabsContent value="damaged-stock" className="space-y-4">
        <DamagedProductTracker />
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
  );
};

export default InventoryManagerTabs;