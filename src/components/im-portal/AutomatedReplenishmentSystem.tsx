
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Settings, Zap, Package, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

interface ReplenishmentRule {
  id: string;
  product: string;
  minThreshold: number;
  maxCapacity: number;
  bufferStock: number;
  autoOrderEnabled: boolean;
  lastTriggered?: Date;
  nextOrderQuantity: number;
  status: 'active' | 'pending' | 'disabled';
}

const AutomatedReplenishmentSystem = () => {
  const [rules, setRules] = useState<ReplenishmentRule[]>([
    {
      id: '1',
      product: 'Fulani Shampoo',
      minThreshold: 100,
      maxCapacity: 1000,
      bufferStock: 150,
      autoOrderEnabled: true,
      lastTriggered: new Date('2024-01-15'),
      nextOrderQuantity: 400,
      status: 'active'
    },
    {
      id: '2',
      product: 'Hydration Tea',
      minThreshold: 50,
      maxCapacity: 500,
      bufferStock: 75,
      autoOrderEnabled: true,
      nextOrderQuantity: 200,
      status: 'pending'
    },
    {
      id: '3',
      product: 'Hair Pomade',
      minThreshold: 30,
      maxCapacity: 300,
      bufferStock: 45,
      autoOrderEnabled: false,
      nextOrderQuantity: 150,
      status: 'disabled'
    },
    {
      id: '4',
      product: 'Body Lotion',
      minThreshold: 80,
      maxCapacity: 800,
      bufferStock: 120,
      autoOrderEnabled: true,
      lastTriggered: new Date('2024-01-10'),
      nextOrderQuantity: 350,
      status: 'active'
    }
  ]);

  const toggleAutoOrder = (id: string) => {
    setRules(rules.map(rule => 
      rule.id === id 
        ? { ...rule, autoOrderEnabled: !rule.autoOrderEnabled, status: !rule.autoOrderEnabled ? 'active' : 'disabled' }
        : rule
    ));
  };

  const triggerManualOrder = (productName: string, quantity: number) => {
    console.log(`Manual order triggered: ${quantity} units of ${productName}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      case 'disabled': return 'bg-gray-500/20 text-gray-400 border-gray-500';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'disabled': return <AlertTriangle className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };

  const activeRules = rules.filter(rule => rule.autoOrderEnabled).length;
  const pendingOrders = rules.filter(rule => rule.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <Zap className="h-6 w-6 text-orange-400" />
            Automated Replenishment System
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500">
              Smart Ordering
            </Badge>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Active Rules</p>
                <p className="text-2xl font-bold text-green-400">{activeRules}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Pending Orders</p>
                <p className="text-2xl font-bold text-yellow-400">{pendingOrders}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Auto Orders Today</p>
                <p className="text-2xl font-bold text-blue-400">3</p>
              </div>
              <Package className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Replenishment Rules */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-lg flex items-center gap-2">
            <Settings className="h-5 w-5 text-blue-400" />
            Replenishment Rules & Thresholds
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rules.map((rule) => (
              <div key={rule.id} className="bg-slate-700/30 rounded-lg p-4">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-center">
                  <div>
                    <h4 className="text-white font-medium mb-1">{rule.product}</h4>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(rule.status)}>
                        {getStatusIcon(rule.status)}
                        {rule.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Thresholds</p>
                    <div className="text-sm">
                      <div className="text-white">Min: {rule.minThreshold}</div>
                      <div className="text-blue-400">Buffer: +{rule.bufferStock}</div>
                      <div className="text-slate-400">Max: {rule.maxCapacity}</div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-slate-400 text-sm mb-2">Stock Level</p>
                    <Progress value={65} className="mb-1" />
                    <p className="text-xs text-slate-400">65% of capacity</p>
                  </div>
                  
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Next Order</p>
                    <p className="text-white font-medium">{rule.nextOrderQuantity} units</p>
                    {rule.lastTriggered && (
                      <p className="text-xs text-slate-400">
                        Last: {rule.lastTriggered.toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={rule.autoOrderEnabled}
                        onCheckedChange={() => toggleAutoOrder(rule.id)}
                      />
                      <span className="text-sm text-slate-300">Auto Order</span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-slate-300 border-slate-600 hover:bg-slate-700"
                      onClick={() => triggerManualOrder(rule.product, rule.nextOrderQuantity)}
                    >
                      Manual Order
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-lg">Recent Automated Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <div>
                <p className="text-white font-medium">Fulani Shampoo - 400 units</p>
                <p className="text-slate-400 text-sm">Triggered by low stock threshold</p>
              </div>
              <Badge className="bg-green-500/20 text-green-400">Completed</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <div>
                <p className="text-white font-medium">Body Lotion - 350 units</p>
                <p className="text-slate-400 text-sm">Predictive reorder based on demand forecast</p>
              </div>
              <Badge className="bg-yellow-500/20 text-yellow-400">Processing</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <div>
                <p className="text-white font-medium">Hydration Tea - 200 units</p>
                <p className="text-slate-400 text-sm">Emergency order - critical stock level</p>
              </div>
              <Badge className="bg-blue-500/20 text-blue-400">Pending</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutomatedReplenishmentSystem;
