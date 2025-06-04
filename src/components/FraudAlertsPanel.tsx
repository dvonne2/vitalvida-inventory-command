
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Shield, Clock, MessageSquare, Flag } from 'lucide-react';

const fraudAlerts = [
  {
    id: 1,
    type: "Mismatched SKU Delivery",
    da: "Femi",
    product: "Pomade",
    issue: "Delivered Conditioner instead of assigned Pomade",
    severity: "high",
    timestamp: "2024-06-04 14:30",
    actionNeeded: "Review with DA",
    status: "flagged"
  },
  {
    id: 2,
    type: "Payment Not Confirmed",
    da: "Tobi",
    product: "Shampoo x2",
    issue: "Claimed delivered, no bank entry for 48h",
    severity: "critical",
    timestamp: "2024-06-04 12:15",
    actionNeeded: "Freeze Access",
    status: "flagged"
  },
  {
    id: 3,
    type: "Missing OTP Submission",
    da: "Lara",
    product: "Conditioner",
    issue: "Claimed OTP sent, no system log recorded",
    severity: "medium",
    timestamp: "2024-06-04 10:45",
    actionNeeded: "Audit Required",
    status: "under_review"
  }
];

const liveAlerts = [
  {
    message: "Stock in Ogun is about to finish in 2 days",
    location: "Ogun State",
    agent: "Tobi",
    timestamp: "2024-06-04 15:20",
    type: "stock_out"
  },
  {
    message: "Berim agent hasn't moved stock in 4 days",
    location: "Berim",
    agent: "Chidi",
    timestamp: "2024-06-04 14:15",
    type: "inactive"
  },
  {
    message: "₦320,000 stock stuck across 4 underperforming agents",
    location: "Multiple",
    agent: "Various",
    timestamp: "2024-06-04 13:30",
    type: "cash_locked"
  }
];

const FraudAlertsPanel = () => {
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge className="bg-red-500 text-white border-0">🚨 Critical</Badge>;
      case "high":
        return <Badge className="bg-orange-500 text-white border-0">⚠️ High</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500 text-white border-0">⚡ Medium</Badge>;
      default:
        return <Badge className="bg-blue-500 text-white border-0">ℹ️ Info</Badge>;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "stock_out":
        return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case "inactive":
        return <Clock className="h-4 w-4 text-yellow-400" />;
      case "cash_locked":
        return <Shield className="h-4 w-4 text-orange-400" />;
      default:
        return <Flag className="h-4 w-4 text-blue-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "flagged":
        return <Badge className="bg-red-500/20 text-red-400 border border-red-500">🚩 Flagged</Badge>;
      case "under_review":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border border-yellow-500">👀 Under Review</Badge>;
      case "resolved":
        return <Badge className="bg-green-500/20 text-green-400 border border-green-500">✅ Resolved</Badge>;
      default:
        return <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500">📋 Pending</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Fraud Detection Panel */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-400" />
            Fraud Detection & Disputes (Admin Only)
          </CardTitle>
          <p className="text-slate-400 text-sm">
            Automated flags for review - invisible to DAs
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {fraudAlerts.map((alert) => (
              <div key={alert.id} className="p-4 bg-slate-700/50 rounded-lg border-l-4 border-red-500">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Flag className="h-5 w-5 text-red-400" />
                    <div>
                      <h4 className="text-white font-medium">{alert.type}</h4>
                      <p className="text-slate-400 text-sm">DA: {alert.da} • Product: {alert.product}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getSeverityBadge(alert.severity)}
                    {getStatusBadge(alert.status)}
                  </div>
                </div>
                
                <p className="text-slate-300 mb-3">{alert.issue}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-slate-400 text-sm">{alert.timestamp}</span>
                    <span className="text-blue-400 text-sm font-medium">{alert.actionNeeded}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="text-blue-400 border-blue-400 hover:bg-blue-400/10">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      WhatsApp
                    </Button>
                    <Button variant="outline" size="sm" className="text-green-400 border-green-400 hover:bg-green-400/10">
                      Resolve
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Live Alerts Panel */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            Live Notifications & Red Flags
          </CardTitle>
          <p className="text-slate-400 text-sm">
            Real-time alerts • Auto-refresh every 5 minutes
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {liveAlerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
                <div className="flex items-center gap-3">
                  {getAlertIcon(alert.type)}
                  <div>
                    <p className="text-white">{alert.message}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-slate-400 text-sm">📍 {alert.location}</span>
                      <span className="text-slate-400 text-sm">👤 {alert.agent}</span>
                      <span className="text-slate-400 text-sm">🕒 {alert.timestamp}</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="text-green-400 border-green-400 hover:bg-green-400/10">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Quick Action Buttons */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button className="bg-red-500 hover:bg-red-600 text-white">
              🚨 Send Stock-Out Alert
            </Button>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
              ⚠️ Flag Inactive DA
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              📊 Generate Fraud Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Fraud Prevention Rules */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">🛡️ Anti-Fraud System Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <h4 className="text-red-400 font-medium mb-2">SKU Verification</h4>
              <p className="text-slate-300 text-sm">No bundle tracking. Each SKU must match assignment exactly.</p>
            </div>
            <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <h4 className="text-yellow-400 font-medium mb-2">Payment Proof</h4>
              <p className="text-slate-300 text-sm">POS receipt or Moniepoint alert required for each sale.</p>
            </div>
            <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <h4 className="text-blue-400 font-medium mb-2">OTP Mandatory</h4>
              <p className="text-slate-300 text-sm">Final confirmation via OTP submission system.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FraudAlertsPanel;
