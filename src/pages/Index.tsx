
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Package, TrendingUp, Users, CheckCircle, XCircle, Clock, MessageSquare, Camera, Flag, Shield, Trophy, DollarSign } from 'lucide-react';
import StockHealthTable from '@/components/StockHealthTable';
import AlertsFeed from '@/components/AlertsFeed';
import ReplenishmentTracker from '@/components/ReplenishmentTracker';
import AuditStatus from '@/components/AuditStatus';
import MismatchMonitor from '@/components/MismatchMonitor';
import QBRDashboard from '@/components/QBRDashboard';
import RestockGenerator from '@/components/RestockGenerator';
import MotivationalCards from '@/components/MotivationalCards';
import DAStockHealth from '@/components/DAStockHealth';
import DASalesTracker from '@/components/DASalesTracker';
import CashLockedInventory from '@/components/CashLockedInventory';
import GamifiedScorecard from '@/components/GamifiedScorecard';
import FraudAlertsPanel from '@/components/FraudAlertsPanel';
import EnhancedDashboardOverview from '@/components/EnhancedDashboardOverview';
import LiveDAInventoryMap from '@/components/LiveDAInventoryMap';

const Index = () => {
  const [lastRefresh, setLastRefresh] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastRefresh(new Date());
    }, 3600000); // Refresh every hour

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Package className="h-8 w-8 text-blue-400" />
              Vitalvida Inventory + DA Command Center
            </h1>
            <p className="text-slate-300 text-sm mt-1">
              Inventory Manager & DA Supervisor Portal | Last updated: {lastRefresh.toLocaleTimeString()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500">
              ● Live SKU Tracking
            </Badge>
            <Button variant="outline" size="sm" className="text-slate-300 border-slate-600 hover:bg-slate-700">
              Refresh Data
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Motivational Cards */}
        <MotivationalCards />

        {/* Enhanced Quick Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Critical Alerts</p>
                  <p className="text-2xl font-bold text-red-400">3</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-400" />
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
                  <p className="text-slate-400 text-sm">SKU Accuracy</p>
                  <p className="text-2xl font-bold text-yellow-400">87%</p>
                </div>
                <Shield className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Cash Locked</p>
                  <p className="text-2xl font-bold text-orange-400">₦304k</p>
                </div>
                <DollarSign className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Top Performer</p>
                  <p className="text-2xl font-bold text-green-400">Femi</p>
                </div>
                <Trophy className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 md:grid-cols-11 bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white text-xs">
              Overview
            </TabsTrigger>
            <TabsTrigger value="live-inventory" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white text-xs">
              🗺️ Live Map
            </TabsTrigger>
            <TabsTrigger value="da-stock-health" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-xs">
              DA Stock Health
            </TabsTrigger>
            <TabsTrigger value="sales-tracker" className="data-[state=active]:bg-green-500 data-[state=active]:text-white text-xs">
              Sales Tracker
            </TabsTrigger>
            <TabsTrigger value="cash-locked" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white text-xs">
              Cash Locked
            </TabsTrigger>
            <TabsTrigger value="scorecard" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white text-xs">
              Scorecard
            </TabsTrigger>
            <TabsTrigger value="fraud-alerts" className="data-[state=active]:bg-red-500 data-[state=active]:text-white text-xs">
              Fraud Alerts
            </TabsTrigger>
            <TabsTrigger value="alerts" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-xs">
              Live Alerts
            </TabsTrigger>
            <TabsTrigger value="replenishment" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white text-xs">
              Replenishment
            </TabsTrigger>
            <TabsTrigger value="qbr" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white text-xs">
              QBR KPIs
            </TabsTrigger>
            <TabsTrigger value="legacy" className="data-[state=active]:bg-gray-500 data-[state=active]:text-white text-xs">
              Legacy
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <EnhancedDashboardOverview />
          </TabsContent>

          <TabsContent value="live-inventory" className="space-y-4">
            <LiveDAInventoryMap />
          </TabsContent>

          <TabsContent value="da-stock-health" className="space-y-4">
            <DAStockHealth />
          </TabsContent>

          <TabsContent value="sales-tracker" className="space-y-4">
            <DASalesTracker />
          </TabsContent>

          <TabsContent value="cash-locked" className="space-y-4">
            <CashLockedInventory />
          </TabsContent>

          <TabsContent value="scorecard" className="space-y-4">
            <GamifiedScorecard />
          </TabsContent>

          <TabsContent value="fraud-alerts" className="space-y-4">
            <FraudAlertsPanel />
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <AlertsFeed />
          </TabsContent>

          <TabsContent value="replenishment" className="space-y-4">
            <ReplenishmentTracker />
          </TabsContent>

          <TabsContent value="qbr" className="space-y-4">
            <QBRDashboard />
          </TabsContent>

          <TabsContent value="legacy" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <StockHealthTable />
              <AuditStatus />
              <MismatchMonitor />
              <RestockGenerator />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
