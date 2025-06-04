
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Package, MapPin, Calendar } from 'lucide-react';

const stockData = [
  {
    daName: "Femi",
    location: "Lagos",
    shampoo: { sku: "5497539000000484113", units: 3, daysLeft: 2, target: 15 },
    pomade: { sku: "5497539000000483026", units: 2, daysLeft: 3, target: 10 },
    conditioner: { sku: "5497539000000483001", units: 4, daysLeft: 4, target: 8 },
    hydrationTea: { sku: "5497539000000484200", units: 1, daysLeft: 2, target: 5 },
    totalUnits: 10,
    weeklyTarget: 38,
    performance: 78
  },
  {
    daName: "Tobi",
    location: "Ogun",
    shampoo: { sku: "5497539000000484113", units: 0, daysLeft: 0, target: 12 },
    pomade: { sku: "5497539000000483026", units: 5, daysLeft: 7, target: 8 },
    conditioner: { sku: "5497539000000483001", units: 1, daysLeft: 1, target: 6 },
    hydrationTea: { sku: "5497539000000484200", units: 0, daysLeft: 0, target: 4 },
    totalUnits: 6,
    weeklyTarget: 30,
    performance: 45
  },
  {
    daName: "Amaka",
    location: "Abuja",
    shampoo: { sku: "5497539000000484113", units: 8, daysLeft: 6, target: 18 },
    pomade: { sku: "5497539000000483026", units: 3, daysLeft: 4, target: 12 },
    conditioner: { sku: "5497539000000483001", units: 2, daysLeft: 3, target: 10 },
    hydrationTea: { sku: "5497539000000484200", units: 4, daysLeft: 8, target: 6 },
    totalUnits: 17,
    weeklyTarget: 46,
    performance: 92
  }
];

const DAStockHealth = () => {
  const getStockStatus = (daysLeft: number) => {
    if (daysLeft <= 1) return { color: "bg-red-500", text: "Critical" };
    if (daysLeft <= 3) return { color: "bg-yellow-500", text: "Warning" };
    return { color: "bg-green-500", text: "Safe" };
  };

  const getDaysLeftDisplay = (daysLeft: number) => {
    if (daysLeft === 0) return "⚠️ OUT OF STOCK";
    if (daysLeft === 1) return "⚠️ 1 day";
    return `${daysLeft} days`;
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 80) return "text-green-400";
    if (performance >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getProgressColor = (performance: number) => {
    if (performance >= 80) return "bg-green-500";
    if (performance >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 border-blue-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm">Total DAs</p>
                <p className="text-2xl font-bold text-white">{stockData.length}</p>
              </div>
              <Package className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/50 to-green-800/30 border-green-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-200 text-sm">High Performers</p>
                <p className="text-2xl font-bold text-white">
                  {stockData.filter(da => da.performance >= 80).length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-900/50 to-red-800/30 border-red-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-200 text-sm">Critical Stock</p>
                <p className="text-2xl font-bold text-white">
                  {stockData.filter(da => 
                    [da.shampoo, da.pomade, da.conditioner, da.hydrationTea]
                      .some(item => item.daysLeft <= 1)
                  ).length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-purple-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">Locations</p>
                <p className="text-2xl font-bold text-white">
                  {new Set(stockData.map(da => da.location)).size}
                </p>
              </div>
              <MapPin className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Main Table */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Package className="h-5 w-5 text-blue-400" />
            DA Stock Health Dashboard - Enhanced View
          </CardTitle>
          <p className="text-slate-400 text-sm">
            Real-time inventory tracking with performance metrics and visual indicators
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-600">
                  <TableHead className="text-slate-300">DA Performance</TableHead>
                  <TableHead className="text-slate-300">Shampoo Status</TableHead>
                  <TableHead className="text-slate-300">Pomade Status</TableHead>
                  <TableHead className="text-slate-300">Conditioner Status</TableHead>
                  <TableHead className="text-slate-300">Hydration Tea</TableHead>
                  <TableHead className="text-slate-300">Weekly Progress</TableHead>
                  <TableHead className="text-slate-300">Overall Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stockData.map((da, index) => {
                  const criticalItems = [da.shampoo, da.pomade, da.conditioner, da.hydrationTea]
                    .filter(item => item.daysLeft <= 2).length;
                  
                  return (
                    <TableRow key={index} className="border-slate-600 hover:bg-slate-700/50">
                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                            <span className="text-white font-medium">{da.daName}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-3 w-3 text-slate-400" />
                            <span className="text-slate-400">{da.location}</span>
                          </div>
                          <div className="text-xs">
                            <span className={`font-medium ${getPerformanceColor(da.performance)}`}>
                              {da.performance}% efficiency
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      {/* Product Status Cells with Progress Bars */}
                      {[da.shampoo, da.pomade, da.conditioner, da.hydrationTea].map((product, productIndex) => (
                        <TableCell key={productIndex}>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-white font-medium">{product.units}</span>
                              <span className="text-xs text-slate-400">/{product.target}</span>
                            </div>
                            <Progress 
                              value={(product.units / product.target) * 100} 
                              className="h-2"
                            />
                            <div className={`text-xs ${product.daysLeft <= 2 ? 'text-red-400' : 'text-slate-400'}`}>
                              {getDaysLeftDisplay(product.daysLeft)}
                            </div>
                          </div>
                        </TableCell>
                      ))}

                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-white font-medium">{da.totalUnits}</span>
                            <span className="text-xs text-slate-400">/{da.weeklyTarget}</span>
                          </div>
                          <Progress 
                            value={da.performance} 
                            className="h-2"
                          />
                          <div className="text-xs text-slate-400">
                            Weekly target progress
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        {criticalItems > 0 ? (
                          <Badge className="bg-red-500 text-white border-0">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            {criticalItems} Critical
                          </Badge>
                        ) : da.performance >= 80 ? (
                          <Badge className="bg-green-500 text-white border-0">
                            ✅ Excellent
                          </Badge>
                        ) : da.performance >= 60 ? (
                          <Badge className="bg-yellow-500 text-white border-0">
                            ⚠️ Good
                          </Badge>
                        ) : (
                          <Badge className="bg-orange-500 text-white border-0">
                            📈 Needs Attention
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DAStockHealth;
