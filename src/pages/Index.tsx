
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Package, TrendingUp, Users, CheckCircle, XCircle, Clock, MessageSquare, Camera, Flag } from 'lucide-react';
import StockHealthTable from '@/components/StockHealthTable';
import AlertsFeed from '@/components/AlertsFeed';
import ReplenishmentTracker from '@/components/ReplenishmentTracker';
import AuditStatus from '@/components/AuditStatus';
import MismatchMonitor from '@/components/MismatchMonitor';
import QBRDashboard from '@/components/QBRDashboard';
import RestockGenerator from '@/components/RestockGenerator';
import MotivationalCards from '@/components/MotivationalCards';

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
              Vitalvida Inventory Command Center
            </h1>
            <p className="text-slate-300 text-sm mt-1">
              Last updated: {lastRefresh.toLocaleTimeString()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500">
              ● Live
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

        {/* Quick Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                  <p className="text-slate-400 text-sm">Stock Accuracy</p>
                  <p className="text-2xl font-bold text-yellow-400">87%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Pending Restocks</p>
                  <p className="text-2xl font-bold text-green-400">5</p>
                </div>
                <Package className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="stock-health" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-7 bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="stock-health" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Stock Health
            </TabsTrigger>
            <TabsTrigger value="alerts" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
              Alerts
            </TabsTrigger>
            <TabsTrigger value="replenishment" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white">
              Replenishment
            </TabsTrigger>
            <TabsTrigger value="audit" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              Audit
            </TabsTrigger>
            <TabsTrigger value="mismatch" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Fraud Monitor
            </TabsTrigger>
            <TabsTrigger value="qbr" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
              QBR KPIs
            </TabsTrigger>
            <TabsTrigger value="restock" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white">
              Auto Restock
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stock-health" className="space-y-4">
            <StockHealthTable />
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <AlertsFeed />
          </TabsContent>

          <TabsContent value="replenishment" className="space-y-4">
            <ReplenishmentTracker />
          </TabsContent>

          <TabsContent value="audit" className="space-y-4">
            <AuditStatus />
          </TabsContent>

          <TabsContent value="mismatch" className="space-y-4">
            <MismatchMonitor />
          </TabsContent>

          <TabsContent value="qbr" className="space-y-4">
            <QBRDashboard />
          </TabsContent>

          <TabsContent value="restock" className="space-y-4">
            <RestockGenerator />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
