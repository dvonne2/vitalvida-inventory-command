import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Command, Shield, Package, TrendingUp, AlertTriangle, Activity, 
  Eye, Route, Scan, Package2, Truck, Brain 
} from 'lucide-react';

// Import operational panels
import DeliveryCompletionTerminal from './DeliveryCompletionTerminal';
import LiveWarehouseActivityFeed from './LiveWarehouseActivityFeed';
import OrderProcessingCommandCenter from './OrderProcessingCommandCenter';
import InventoryMovementTracker from './InventoryMovementTracker';
import StockAlertDashboard from './StockAlertDashboard';
import PerformanceMetricsDashboard from './PerformanceMetricsDashboard';
import BinActivityMonitor from './BinActivityMonitor';
import DeliveryCommandDashboard from './DeliveryCommandDashboard';
import DeliveryOrderIntelligencePanel from './DeliveryOrderIntelligencePanel';
import ItemJourneyTracker from './ItemJourneyTracker';
import MovementIntelligenceDashboard from './MovementIntelligenceDashboard';

const OperationsHub = () => {
  const [activePanel, setActivePanel] = useState('overview');
  const [criticalAlerts, setCriticalAlerts] = useState(3);
  const [activeOperations, setActiveOperations] = useState(12);

  const operationalPanels = [
    {
      id: 'order-processing',
      name: 'Order Processing',
      icon: Package,
      description: 'End-to-end order fulfillment',
      status: 'active',
      component: OrderProcessingCommandCenter
    },
    {
      id: 'delivery-completion',
      name: 'Delivery Terminal',
      icon: Shield,
      description: 'OTP verification & completion',
      status: 'active',
      component: DeliveryCompletionTerminal
    },
    {
      id: 'warehouse-activity',
      name: 'Live Activity Feed',
      icon: Activity,
      description: 'Real-time warehouse monitoring',
      status: 'active',
      component: LiveWarehouseActivityFeed
    },
    {
      id: 'movement-tracker',
      name: 'Movement Tracker',
      icon: Route,
      description: 'Inventory movement monitoring',
      status: 'active',
      component: InventoryMovementTracker
    },
    {
      id: 'stock-alerts',
      name: 'Stock Alerts',
      icon: AlertTriangle,
      description: 'Smart stock monitoring',
      status: 'warning',
      component: StockAlertDashboard
    },
    {
      id: 'performance-metrics',
      name: 'Performance KPIs',
      icon: TrendingUp,
      description: 'Real-time performance dashboard',
      status: 'active',
      component: PerformanceMetricsDashboard
    },
    {
      id: 'bin-activity',
      name: 'Bin Monitor',
      icon: Package2,
      description: 'Bin-level activity tracking',
      status: 'active',
      component: BinActivityMonitor
    },
    {
      id: 'delivery-command',
      name: 'Delivery Command',
      icon: Truck,
      description: 'Delivery orchestration center',
      status: 'active',
      component: DeliveryCommandDashboard
    },
    {
      id: 'order-intelligence',
      name: 'Order Intelligence',
      icon: Brain,
      description: 'AI-powered order insights',
      status: 'active',
      component: DeliveryOrderIntelligencePanel
    },
    {
      id: 'item-journey',
      name: 'Item Journey',
      icon: Eye,
      description: 'End-to-end item tracking',
      status: 'active',
      component: ItemJourneyTracker
    },
    {
      id: 'movement-intelligence',
      name: 'Movement Intelligence',
      icon: Scan,
      description: 'Smart movement analytics',
      status: 'active',
      component: MovementIntelligenceDashboard
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500';
      case 'warning': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      case 'error': return 'bg-red-500/20 text-red-400 border-red-500';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500';
    }
  };

  const renderActiveComponent = () => {
    if (activePanel === 'overview') return null;
    
    const panel = operationalPanels.find(p => p.id === activePanel);
    if (!panel?.component) return null;
    
    const Component = panel.component;
    return <Component />;
  };

  return (
    <div className="space-y-6">
      {/* Operations Hub Header */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <Command className="h-6 w-6 text-blue-400" />
            Operations Command Center
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500">
              11 Active Panels
            </Badge>
            <Badge className="bg-red-500/20 text-red-400 border-red-500">
              {criticalAlerts} Alerts
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-center">
              <p className="text-green-400 text-2xl font-bold">{activeOperations}</p>
              <p className="text-green-300 text-sm">Active Operations</p>
            </div>
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-center">
              <p className="text-blue-400 text-2xl font-bold">94.6%</p>
              <p className="text-blue-300 text-sm">Overall Efficiency</p>
            </div>
            <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg text-center">
              <p className="text-purple-400 text-2xl font-bold">156</p>
              <p className="text-purple-300 text-sm">Orders Processed</p>
            </div>
            <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg text-center">
              <p className="text-orange-400 text-2xl font-bold">4.2m</p>
              <p className="text-orange-300 text-sm">Avg Processing Time</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Panel Navigation */}
      <Tabs value={activePanel} onValueChange={setActivePanel} className="space-y-6">
        <div className="w-full overflow-x-auto">
          <TabsList className="inline-flex h-12 items-center justify-start rounded-md bg-slate-800/50 border border-slate-700 p-1 text-muted-foreground min-w-max">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white px-4 py-2"
            >
              📊 Overview
            </TabsTrigger>
            {operationalPanels.map((panel) => (
              <TabsTrigger
                key={panel.id}
                value={panel.id}
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white px-4 py-2 flex items-center gap-2"
              >
                <panel.icon className="h-4 w-4" />
                {panel.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-6">
          {/* Panel Grid Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {operationalPanels.map((panel) => (
              <Card key={panel.id} className="bg-slate-700/30 border-slate-600 hover:bg-slate-700/50 transition-colors cursor-pointer"
                    onClick={() => setActivePanel(panel.id)}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <panel.icon className="h-8 w-8 text-blue-400" />
                    <Badge className={getStatusColor(panel.status)}>
                      {panel.status}
                    </Badge>
                  </div>
                  <h3 className="text-white font-semibold mb-2">{panel.name}</h3>
                  <p className="text-slate-400 text-sm mb-4">{panel.description}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-slate-600 text-slate-300 hover:bg-slate-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePanel(panel.id);
                    }}
                  >
                    Launch Panel
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Individual Panel Content */}
        {operationalPanels.map((panel) => (
          <TabsContent key={panel.id} value={panel.id} className="space-y-4">
            {renderActiveComponent()}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default OperationsHub;