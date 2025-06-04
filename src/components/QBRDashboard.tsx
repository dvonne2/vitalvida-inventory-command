
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const kpiData = [
  {
    name: "Stock Accuracy Compliance",
    target: "≥ 95%",
    actual: 87,
    status: "Improve",
    statusColor: "bg-yellow-500",
    qbrImpact: "Affects bonus calculations",
    trend: "down"
  },
  {
    name: "Stock-Outs Prevented",
    target: "100% of alerts",
    actual: 92,
    status: "Good",
    statusColor: "bg-green-500",
    qbrImpact: "Supports DA delivery success",
    trend: "up"
  },
  {
    name: "Replenishment Timeliness",
    target: "≥ 90% on-time",
    actual: 70,
    status: "Critical",
    statusColor: "bg-red-500",
    qbrImpact: "Causes bonus loss for DAs",
    trend: "down"
  },
  {
    name: "Mismatch Resolution Time",
    target: "< 24h avg",
    actual: 41,
    actualUnit: "h",
    status: "Improve",
    statusColor: "bg-yellow-500",
    qbrImpact: "Slows fraud resolution",
    trend: "up"
  },
  {
    name: "DA Audit Coverage",
    target: "100% weekly",
    actual: 81,
    status: "Missed",
    statusColor: "bg-red-500",
    qbrImpact: "Incomplete data visibility",
    trend: "stable"
  }
];

const QBRDashboard = () => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": 
        return <TrendingUp className="h-4 w-4 text-green-400" />;
      case "down": 
        return <TrendingDown className="h-4 w-4 text-red-400" />;
      default: 
        return <Minus className="h-4 w-4 text-slate-400" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Good": 
        return "✅";
      case "Critical": 
        return "❌";
      case "Improve": 
        return "⚠️";
      case "Missed": 
        return "⚠️";
      default: 
        return "ℹ️";
    }
  };

  return (
    <div className="space-y-6">
      {/* QBR Overview */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-400" />
            QBR Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-500/20 border border-green-500 rounded-lg">
              <p className="text-3xl font-bold text-green-400">2</p>
              <p className="text-green-400">KPIs Meeting Target</p>
            </div>
            <div className="text-center p-4 bg-yellow-500/20 border border-yellow-500 rounded-lg">
              <p className="text-3xl font-bold text-yellow-400">2</p>
              <p className="text-yellow-400">KPIs Need Improvement</p>
            </div>
            <div className="text-center p-4 bg-red-500/20 border border-red-500 rounded-lg">
              <p className="text-3xl font-bold text-red-400">1</p>
              <p className="text-red-400">Critical KPIs</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed KPI Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-lg">{kpi.name}</CardTitle>
                <div className="flex items-center gap-2">
                  {getTrendIcon(kpi.trend)}
                  <Badge className={`${kpi.statusColor} text-white border-0`}>
                    {getStatusIcon(kpi.status)} {kpi.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Target: {kpi.target}</span>
                <span className="text-2xl font-bold text-blue-400">
                  {kpi.actual}{kpi.actualUnit || '%'}
                </span>
              </div>
              
              <Progress 
                value={kpi.actualUnit ? Math.min((24 / kpi.actual) * 100, 100) : kpi.actual} 
                className="h-3"
              />
              
              <div className="p-3 bg-slate-700/50 rounded-lg">
                <p className="text-sm text-slate-300">
                  <strong className="text-blue-400">QBR Impact:</strong> {kpi.qbrImpact}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Items */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Immediate Action Items for QBR</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-red-500/20 border border-red-500 rounded-lg">
              <span className="text-red-400 font-bold">1.</span>
              <div>
                <p className="text-red-400 font-medium">Critical: Improve Replenishment Timeliness</p>
                <p className="text-slate-300 text-sm">Current 70% vs target 90%. Focus on reducing dispatch delays and improving coordination with logistics team.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-yellow-500/20 border border-yellow-500 rounded-lg">
              <span className="text-yellow-400 font-bold">2.</span>
              <div>
                <p className="text-yellow-400 font-medium">Warning: Increase DA Audit Coverage</p>
                <p className="text-slate-300 text-sm">Currently at 81% vs target 100%. Send reminder alerts to non-compliant DAs and their guarantors.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-blue-500/20 border border-blue-500 rounded-lg">
              <span className="text-blue-400 font-bold">3.</span>
              <div>
                <p className="text-blue-400 font-medium">Focus: Reduce Mismatch Resolution Time</p>
                <p className="text-slate-300 text-sm">Average 41h vs target less than 24h. Implement faster escalation procedures for unresolved mismatches.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QBRDashboard;
