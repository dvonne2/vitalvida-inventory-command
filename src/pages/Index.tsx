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
import InventoryManagerPortal from '@/components/InventoryManagerPortal';
import TotalProductStockOverview from '@/components/TotalProductStockOverview';
import WeeklyPhotoReview from '@/components/inventory-flow/WeeklyPhotoReview';
import DeliveryVerificationPanel from '@/components/delivery-verification/DeliveryVerificationPanel';
import InventoryManagerEnforcementDashboard from '@/components/InventoryManagerEnforcementDashboard';
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
      case 'inventory_manager':
        return 'bg-blue-500/20 text-blue-400 border-blue-500';
      case 'accountant':
        return 'bg-green-500/20 text-green-400 border-green-500';
      case 'telesales':
        return 'bg-purple-500/20 text-purple-400 border-purple-500';
      case 'admin':
        return 'bg-red-500/20 text-red-400 border-red-500';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500';
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
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
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-slate-400" />
              <select value={userRole} onChange={e => handleRoleChange(e.target.value)} className="bg-slate-700 border border-slate-600 text-white rounded-md px-3 py-1 text-sm">
                <option value="inventory_manager">Inventory Manager</option>
                <option value="accountant">Accountant</option>
                <option value="telesales">Telesales</option>
                <option value="admin">Admin</option>
              </select>
              <Badge className={getRoleColor(userRole)}>
                {userRole.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>
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

        {/* Quick Navigation */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-semibold text-lg mb-2">Quick Access</h3>
                <p className="text-slate-400">Navigate to specialized inventory management tools</p>
              </div>
              <Button onClick={() => window.location.href = '/inventory-stock-flow'} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Package className="mr-2 h-4 w-4" />
                Inventory Stock Flow
              </Button>
            </div>
          </CardContent>
        </Card>

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
          <div className="w-full overflow-x-auto">
            <TabsList className="inline-flex h-10 items-center justify-start rounded-md bg-slate-800/50 border border-slate-700 p-1 text-muted-foreground min-w-max">
              <TabsTrigger value="overview" className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-sm">
                Overview
              </TabsTrigger>
              <TabsTrigger value="enforcement-dashboard" className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:shadow-sm">
                <span className="mr-1">⚠️</span>
                Enforcement Dashboard
              </TabsTrigger>
              <TabsTrigger value="delivery-verification" className="inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-sm rounded">
                <span className="mr-1">💳</span>
                Payment & OTP
              </TabsTrigger>
              <TabsTrigger value="stock-overview" className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-sm">
                <span className="mr-1">📊</span>
                Stock Overview
              </TabsTrigger>
              <TabsTrigger value="photo-verification" className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-purple-500 data-[state=active]:text-white data-[state=active]:shadow-sm">
                <span className="mr-1">📷</span>
                Photo Verification
              </TabsTrigger>
              <TabsTrigger value="im-portal" className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-sm">
                <span className="mr-1">📦</span>
                IM Portal
              </TabsTrigger>
              <TabsTrigger value="live-inventory" className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-sm">
                <span className="mr-1">🗺️</span>
                Live Map
              </TabsTrigger>
              <TabsTrigger value="accountant-panel" className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-green-500 data-[state=active]:text-white data-[state=active]:shadow-sm">
                <span className="mr-1">💳</span>
                Accountant
              </TabsTrigger>
              <TabsTrigger value="telesales-panel" className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-purple-500 data-[state=active]:text-white data-[state=active]:shadow-sm">
                <span className="mr-1">📞</span>
                Telesales
              </TabsTrigger>
              <TabsTrigger value="da-stock-health" className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-sm">
                DA Stock
              </TabsTrigger>
              <TabsTrigger value="sales-tracker" className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-green-500 data-[state=active]:text-white data-[state=active]:shadow-sm">
                Delivery Tracker
              </TabsTrigger>
              <TabsTrigger value="cash-locked" className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-yellow-500 data-[state=active]:text-white data-[state=active]:shadow-sm">
                Cash Locked
              </TabsTrigger>
              <TabsTrigger value="scorecard" className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-purple-500 data-[state=active]:text-white data-[state=active]:shadow-sm">
                Scorecard
              </TabsTrigger>
              <TabsTrigger value="fraud-alerts" className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:shadow-sm">
                Fraud Alerts
              </TabsTrigger>
              <TabsTrigger value="alerts" className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-sm">
                Live Alerts
              </TabsTrigger>
              <TabsTrigger value="legacy" className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-gray-500 data-[state=active]:text-white data-[state=active]:shadow-sm">
                Legacy
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-4">
            <EnhancedDashboardOverview />
          </TabsContent>

          <TabsContent value="enforcement-dashboard" className="space-y-4">
            <InventoryManagerEnforcementDashboard />
          </TabsContent>

          <TabsContent value="delivery-verification" className="space-y-4">
            <DeliveryVerificationPanel />
          </TabsContent>

          <TabsContent value="stock-overview" className="space-y-4">
            <TotalProductStockOverview />
          </TabsContent>

          <TabsContent value="photo-verification" className="space-y-4">
            <WeeklyPhotoReview />
          </TabsContent>

          <TabsContent value="im-portal" className="space-y-4">
            <InventoryManagerPortal />
          </TabsContent>

          <TabsContent value="live-inventory" className="space-y-4">
            <LiveDAInventoryMap />
          </TabsContent>

          <TabsContent value="accountant-panel" className="space-y-4">
            {userRole === 'accountant' || userRole === 'admin' ? <AccountantPaymentPanel /> : <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-8 text-center">
                  <Shield className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-white font-medium mb-2">Access Restricted</h3>
                  <p className="text-slate-400">This panel is only accessible to Accountant role</p>
                </CardContent>
              </Card>}
          </TabsContent>

          <TabsContent value="telesales-panel" className="space-y-4">
            {userRole === 'telesales' || userRole === 'admin' ? <TelesalesConfirmationPanel /> : <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-8 text-center">
                  <Shield className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-white font-medium mb-2">Access Restricted</h3>
                  <p className="text-slate-400">This panel is only accessible to Telesales role</p>
                </CardContent>
              </Card>}
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
    </div>;
};
export default Index;