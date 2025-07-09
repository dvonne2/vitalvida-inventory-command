import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, TrendingDown, Package, Clock, Bell } from 'lucide-react';

const StockAlertDashboard = () => {
  const [alerts, setAlerts] = useState([
    { id: 'ALT-001', product: 'Fulani Shampoo', location: 'DA-Lagos-01', currentStock: 5, threshold: 10, severity: 'critical', lastUpdated: '2 mins ago' },
    { id: 'ALT-002', product: 'Hydration Tea', location: 'Warehouse B', currentStock: 15, threshold: 20, severity: 'warning', lastUpdated: '5 mins ago' },
    { id: 'ALT-003', product: 'Hair Oil', location: 'DA-Abuja-02', currentStock: 2, threshold: 8, severity: 'critical', lastUpdated: '1 min ago' },
    { id: 'ALT-004', product: 'Pomade', location: 'Warehouse A', currentStock: 25, threshold: 30, severity: 'info', lastUpdated: '10 mins ago' },
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500';
      case 'warning': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      case 'info': return 'bg-blue-500/20 text-blue-400 border-blue-500';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return '🔴';
      case 'warning': return '🟡';
      case 'info': return '🔵';
      default: return '⚪';
    }
  };

  const criticalAlerts = alerts.filter(alert => alert.severity === 'critical').length;
  const warningAlerts = alerts.filter(alert => alert.severity === 'warning').length;

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-red-400" />
            Smart Stock Alert Dashboard
            <Badge className="bg-red-500/20 text-red-400 border-red-500">
              {criticalAlerts} Critical
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Alert Summary */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-center">
              <p className="text-red-400 text-2xl font-bold">{criticalAlerts}</p>
              <p className="text-red-300 text-sm">Critical Alerts</p>
            </div>
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-center">
              <p className="text-yellow-400 text-2xl font-bold">{warningAlerts}</p>
              <p className="text-yellow-300 text-sm">Warning Alerts</p>
            </div>
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-center">
              <p className="text-blue-400 text-2xl font-bold">{alerts.length}</p>
              <p className="text-blue-300 text-sm">Total Alerts</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <Button className="bg-red-600 hover:bg-red-700 flex-1">
              Auto-Generate Restock Orders
            </Button>
            <Button variant="outline" className="border-slate-600 text-slate-300">
              <Bell className="h-4 w-4 mr-2" />
              Configure Alerts
            </Button>
          </div>

          {/* Alert List */}
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="p-4 bg-slate-700/30 rounded-lg border-l-4 border-l-red-500">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{getSeverityIcon(alert.severity)}</span>
                    <div>
                      <p className="text-white font-medium">{alert.product}</p>
                      <p className="text-slate-400 text-sm">{alert.location}</p>
                    </div>
                  </div>
                  <Badge className={getSeverityColor(alert.severity)}>
                    {alert.severity}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <p className="text-slate-400 text-xs">Current Stock</p>
                    <p className="text-white font-bold">{alert.currentStock} units</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">Threshold</p>
                    <p className="text-white font-bold">{alert.threshold} units</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">Last Updated</p>
                    <p className="text-white font-bold">{alert.lastUpdated}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-300">
                    Stock level {Math.round((alert.currentStock / alert.threshold) * 100)}% of threshold
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                      Restock Now
                    </Button>
                    <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                      Dismiss
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockAlertDashboard;