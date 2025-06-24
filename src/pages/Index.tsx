
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Package, TrendingUp, Users, CheckCircle, XCircle, Clock, MessageSquare, Camera, Flag, Shield, Trophy, DollarSign, UserCheck } from 'lucide-react';
import StockHealthTable from '@/components/StockHealthTable';
import AlertsFeed from '@/components/AlertsFeed';
import ReplenishmentTracker from '@/components/ReplenishmentTracker';
import AuditStatus from '@/components/AuditStatus';
import MismatchMonitor from '@/components/MismatchMonitor';
import QBRDashboard from '@/components/QBRDashboard';
import RestockGenerator from '@/components/RestockGenerator';
import MotivationalCards from '@/components/MotivationalCards';
import DAStockHealth from '@/components/DAStockHealth';
import DADeliveryApprovalTracker from '@/components/DADeliveryApprovalTracker';
import AccountantPaymentPanel from '@/components/AccountantPaymentPanel';
import TelesalesConfirmationPanel from '@/components/TelesalesConfirmationPanel';
import CashLockedInventory from '@/components/CashLockedInventory';
import GamifiedScorecard from '@/components/GamifiedScorecard';
import FraudAlertsPanel from '@/components/FraudAlertsPanel';
import EnhancedDashboardOverview from '@/components/EnhancedDashboardOverview';
import LiveDAInventoryMap from '@/components/LiveDAInventoryMap';

type UserRole = 'inventory_manager' | 'accountant' | 'telesales' | 'admin';

const Index = () => {
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [userRole, setUserRole] = useState<UserRole>('inventory_manager');

  useEffect(() => {
    const interval = setInterval(() => {
      setLastRefresh(new Date());
    }, 3600000); // Refresh every hour

    return () => clearInterval(interval);
  }, []);

  const handleRoleChange = (role: string) => {
    setUserRole(role as UserRole);
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'inventory_manager': return 'bg-teal/10 text-teal border-teal';
      case 'accountant': return 'bg-success/10 text-success border-success';
      case 'telesales': return 'bg-purple-500/10 text-purple-600 border-purple-500';
      case 'admin': return 'bg-destructive/10 text-destructive border-destructive';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Package className="h-8 w-8 text-teal" />
              Vitalvida Inventory + DA Command Center
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Inventory Manager & DA Supervisor Portal | Last updated: {lastRefresh.toLocaleTimeString()}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-muted-foreground" />
              <select 
                value={userRole} 
                onChange={(e) => handleRoleChange(e.target.value)}
                className="bg-white border border-gray-300 text-foreground rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-teal focus:border-teal"
              >
                <option value="inventory_manager">Inventory Manager</option>
                <option value="accountant">Accountant</option>
                <option value="telesales">Telesales</option>
                <option value="admin">Admin</option>
              </select>
              <Badge className={getRoleColor(userRole)}>
                {userRole.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>
            <Badge variant="outline" className="bg-success/10 text-success border-success">
              ● Live SKU Tracking
            </Badge>
            <Button variant="outline" size="sm" className="text-foreground border-gray-300 hover:bg-gray-50">
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
          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Critical Alerts</p>
                  <p className="text-2xl font-bold text-destructive">3</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Active DAs</p>
                  <p className="text-2xl font-bold text-teal">12</p>
                </div>
                <Users className="h-8 w-8 text-teal" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">SKU Accuracy</p>
                  <p className="text-2xl font-bold text-warning">87%</p>
                </div>
                <Shield className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Cash Locked</p>
                  <p className="text-2xl font-bold text-destructive">₦304k</p>
                </div>
                <DollarSign className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Top Performer</p>
                  <p className="text-2xl font-bold text-gold">Femi</p>
                </div>
                <Trophy className="h-8 w-8 text-gold" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 md:grid-cols-12 bg-white border border-gray-200 shadow-sm">
            <TabsTrigger value="overview" className="data-[state=active]:bg-teal data-[state=active]:text-white text-xs">
              Overview
            </TabsTrigger>
            <TabsTrigger value="live-inventory" className="data-[state=active]:bg-aqua data-[state=active]:text-white text-xs">
              🗺️ Live Map
            </TabsTrigger>
            <TabsTrigger value="accountant-panel" className="data-[state=active]:bg-success data-[state=active]:text-white text-xs">
              💳 Accountant
            </TabsTrigger>
            <TabsTrigger value="telesales-panel" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white text-xs">
              📞 Telesales
            </TabsTrigger>
            <TabsTrigger value="da-stock-health" className="data-[state=active]:bg-teal data-[state=active]:text-white text-xs">
              DA Stock Health
            </TabsTrigger>
            <TabsTrigger value="sales-tracker" className="data-[state=active]:bg-success data-[state=active]:text-white text-xs">
              Delivery Approval Tracker
            </TabsTrigger>
            <TabsTrigger value="cash-locked" className="data-[state=active]:bg-warning data-[state=active]:text-white text-xs">
              Cash Locked
            </TabsTrigger>
            <TabsTrigger value="scorecard" className="data-[state=active]:bg-gold data-[state=active]:text-white text-xs">
              Scorecard
            </TabsTrigger>
            <TabsTrigger value="fraud-alerts" className="data-[state=active]:bg-destructive data-[state=active]:text-white text-xs">
              Fraud Alerts
            </TabsTrigger>
            <TabsTrigger value="alerts" className="data-[state=active]:bg-warning data-[state=active]:text-white text-xs">
              Live Alerts
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

          <TabsContent value="accountant-panel" className="space-y-4">
            {userRole === 'accountant' || userRole === 'admin' ? (
              <AccountantPaymentPanel />
            ) : (
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardContent className="p-8 text-center">
                  <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-foreground font-medium mb-2">Access Restricted</h3>
                  <p className="text-muted-foreground">This panel is only accessible to Accountant role</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="telesales-panel" className="space-y-4">
            {userRole === 'telesales' || userRole === 'admin' ? (
              <TelesalesConfirmationPanel />
            ) : (
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardContent className="p-8 text-center">
                  <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-foreground font-medium mb-2">Access Restricted</h3>
                  <p className="text-muted-foreground">This panel is only accessible to Telesales role</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="da-stock-health" className="space-y-4">
            <DAStockHealth />
          </TabsContent>

          <TabsContent value="sales-tracker" className="space-y-4">
            <DADeliveryApprovalTracker userRole={userRole} userId="current_user" />
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
