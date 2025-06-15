
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Map, CreditCard, Phone, Shield } from 'lucide-react';
import StockHealthTable from '@/components/StockHealthTable';
import AlertsFeed from '@/components/AlertsFeed';
import ReplenishmentTracker from '@/components/ReplenishmentTracker';
import AuditStatus from '@/components/AuditStatus';
import MismatchMonitor from '@/components/MismatchMonitor';
import RestockGenerator from '@/components/RestockGenerator';
import DAStockHealth from '@/components/DAStockHealth';
import DADeliveryApprovalTracker from '@/components/DADeliveryApprovalTracker';
import AccountantPaymentPanel from '@/components/AccountantPaymentPanel';
import TelesalesConfirmationPanel from '@/components/TelesalesConfirmationPanel';
import CashLockedInventory from '@/components/CashLockedInventory';
import GamifiedScorecard from '@/components/GamifiedScorecard';
import FraudAlertsPanel from '@/components/FraudAlertsPanel';
import EnhancedDashboardOverview from '@/components/EnhancedDashboardOverview';
import LiveDAInventoryMap from '@/components/LiveDAInventoryMap';
import { UserRole } from '@/types';

interface DashboardTabsProps {
  userRole: UserRole;
}

const DashboardTabs = ({ userRole }: DashboardTabsProps) => {
  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList className="flex overflow-x-auto md:grid md:grid-cols-12 bg-slate-800/50 border border-slate-700 rounded-lg p-1">
        <TabsTrigger value="overview" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white text-xs">
          Overview
        </TabsTrigger>
        <TabsTrigger value="live-inventory" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white text-xs flex items-center gap-1">
          <Map className="h-4 w-4" />
          Live Map
        </TabsTrigger>
        <TabsTrigger value="accountant-panel" className="data-[state=active]:bg-green-500 data-[state=active]:text-white text-xs flex items-center gap-1">
          <CreditCard className="h-4 w-4" />
          Accountant
        </TabsTrigger>
        <TabsTrigger value="telesales-panel" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white text-xs flex items-center gap-1">
          <Phone className="h-4 w-4" />
          Telesales
        </TabsTrigger>
        <TabsTrigger value="da-stock-health" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-xs">
          DA Stock Health
        </TabsTrigger>
        <TabsTrigger value="sales-tracker" className="data-[state=active]:bg-green-500 data-[state=active]:text-white text-xs">
          Delivery Approval Tracker
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
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-8 text-center">
              <Shield className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-white font-medium mb-2">Access Restricted</h3>
              <p className="text-slate-400">This panel is only accessible to Accountant role</p>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      <TabsContent value="telesales-panel" className="space-y-4">
        {userRole === 'telesales' || userRole === 'admin' ? (
          <TelesalesConfirmationPanel />
        ) : (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-8 text-center">
              <Shield className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-white font-medium mb-2">Access Restricted</h3>
              <p className="text-slate-400">This panel is only accessible to Telesales role</p>
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
  );
};

export default DashboardTabs;
