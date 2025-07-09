import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, Target, Clock, Users, Package, Zap } from 'lucide-react';

const PerformanceMetricsDashboard = () => {
  const [timeframe, setTimeframe] = useState('today');
  
  const metrics = {
    today: {
      orderProcessingTime: { value: 4.2, target: 5.0, trend: '+12%' },
      inventoryAccuracy: { value: 97.8, target: 98.0, trend: '+2.1%' },
      daProductivity: { value: 89.4, target: 85.0, trend: '+5.2%' },
      stockTurnover: { value: 3.2, target: 3.0, trend: '+6.7%' },
      systemUptime: { value: 99.9, target: 99.5, trend: '+0.4%' },
      costEfficiency: { value: 94.6, target: 90.0, trend: '+4.6%' },
    }
  };

  const currentMetrics = metrics[timeframe as keyof typeof metrics];

  const getPerformanceColor = (value: number, target: number) => {
    const percentage = (value / target) * 100;
    if (percentage >= 100) return 'text-green-400';
    if (percentage >= 90) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getProgressColor = (value: number, target: number) => {
    const percentage = (value / target) * 100;
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 90) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-green-400" />
            Performance Metrics Dashboard
            <Badge className="bg-green-500/20 text-green-400 border-green-500">
              Real-Time KPIs
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Time Filter */}
          <div className="flex items-center gap-4">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-40 bg-slate-700/50 border-slate-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
            <Badge variant="outline" className="border-slate-500 text-slate-300">
              Last updated: 2 minutes ago
            </Badge>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Order Processing Time */}
            <Card className="bg-slate-700/30 border-slate-600">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-400" />
                    <span className="text-white font-medium">Avg Processing Time</span>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500">
                    {currentMetrics.orderProcessingTime.trend}
                  </Badge>
                </div>
                <div className="mb-2">
                  <span className={`text-2xl font-bold ${getPerformanceColor(currentMetrics.orderProcessingTime.value, currentMetrics.orderProcessingTime.target)}`}>
                    {currentMetrics.orderProcessingTime.value}m
                  </span>
                  <span className="text-slate-400 text-sm ml-2">/ {currentMetrics.orderProcessingTime.target}m target</span>
                </div>
                <Progress 
                  value={(currentMetrics.orderProcessingTime.target / currentMetrics.orderProcessingTime.value) * 100} 
                  className="h-2"
                />
              </CardContent>
            </Card>

            {/* Inventory Accuracy */}
            <Card className="bg-slate-700/30 border-slate-600">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-purple-400" />
                    <span className="text-white font-medium">Inventory Accuracy</span>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500">
                    {currentMetrics.inventoryAccuracy.trend}
                  </Badge>
                </div>
                <div className="mb-2">
                  <span className={`text-2xl font-bold ${getPerformanceColor(currentMetrics.inventoryAccuracy.value, currentMetrics.inventoryAccuracy.target)}`}>
                    {currentMetrics.inventoryAccuracy.value}%
                  </span>
                  <span className="text-slate-400 text-sm ml-2">/ {currentMetrics.inventoryAccuracy.target}% target</span>
                </div>
                <Progress 
                  value={currentMetrics.inventoryAccuracy.value} 
                  className="h-2"
                />
              </CardContent>
            </Card>

            {/* DA Productivity */}
            <Card className="bg-slate-700/30 border-slate-600">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-orange-400" />
                    <span className="text-white font-medium">DA Productivity</span>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500">
                    {currentMetrics.daProductivity.trend}
                  </Badge>
                </div>
                <div className="mb-2">
                  <span className={`text-2xl font-bold ${getPerformanceColor(currentMetrics.daProductivity.value, currentMetrics.daProductivity.target)}`}>
                    {currentMetrics.daProductivity.value}%
                  </span>
                  <span className="text-slate-400 text-sm ml-2">/ {currentMetrics.daProductivity.target}% target</span>
                </div>
                <Progress 
                  value={currentMetrics.daProductivity.value} 
                  className="h-2"
                />
              </CardContent>
            </Card>

            {/* Stock Turnover */}
            <Card className="bg-slate-700/30 border-slate-600">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-cyan-400" />
                    <span className="text-white font-medium">Stock Turnover</span>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500">
                    {currentMetrics.stockTurnover.trend}
                  </Badge>
                </div>
                <div className="mb-2">
                  <span className={`text-2xl font-bold ${getPerformanceColor(currentMetrics.stockTurnover.value, currentMetrics.stockTurnover.target)}`}>
                    {currentMetrics.stockTurnover.value}x
                  </span>
                  <span className="text-slate-400 text-sm ml-2">/ {currentMetrics.stockTurnover.target}x target</span>
                </div>
                <Progress 
                  value={(currentMetrics.stockTurnover.value / 5) * 100} 
                  className="h-2"
                />
              </CardContent>
            </Card>

            {/* System Uptime */}
            <Card className="bg-slate-700/30 border-slate-600">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-green-400" />
                    <span className="text-white font-medium">System Uptime</span>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500">
                    {currentMetrics.systemUptime.trend}
                  </Badge>
                </div>
                <div className="mb-2">
                  <span className={`text-2xl font-bold ${getPerformanceColor(currentMetrics.systemUptime.value, currentMetrics.systemUptime.target)}`}>
                    {currentMetrics.systemUptime.value}%
                  </span>
                  <span className="text-slate-400 text-sm ml-2">/ {currentMetrics.systemUptime.target}% target</span>
                </div>
                <Progress 
                  value={currentMetrics.systemUptime.value} 
                  className="h-2"
                />
              </CardContent>
            </Card>

            {/* Cost Efficiency */}
            <Card className="bg-slate-700/30 border-slate-600">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-emerald-400" />
                    <span className="text-white font-medium">Cost Efficiency</span>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500">
                    {currentMetrics.costEfficiency.trend}
                  </Badge>
                </div>
                <div className="mb-2">
                  <span className={`text-2xl font-bold ${getPerformanceColor(currentMetrics.costEfficiency.value, currentMetrics.costEfficiency.target)}`}>
                    {currentMetrics.costEfficiency.value}%
                  </span>
                  <span className="text-slate-400 text-sm ml-2">/ {currentMetrics.costEfficiency.target}% target</span>
                </div>
                <Progress 
                  value={currentMetrics.costEfficiency.value} 
                  className="h-2"
                />
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceMetricsDashboard;