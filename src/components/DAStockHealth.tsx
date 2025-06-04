
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Package } from 'lucide-react';

const stockData = [
  {
    daName: "Femi",
    location: "Lagos",
    shampoo: { sku: "5497539000000484113", units: 3, daysLeft: 2 },
    pomade: { sku: "5497539000000483026", units: 2, daysLeft: 3 },
    conditioner: { sku: "5497539000000483001", units: 4, daysLeft: 4 },
    hydrationTea: { sku: "5497539000000484200", units: 1, daysLeft: 2 },
    totalUnits: 10
  },
  {
    daName: "Tobi",
    location: "Ogun",
    shampoo: { sku: "5497539000000484113", units: 0, daysLeft: 0 },
    pomade: { sku: "5497539000000483026", units: 5, daysLeft: 7 },
    conditioner: { sku: "5497539000000483001", units: 1, daysLeft: 1 },
    hydrationTea: { sku: "5497539000000484200", units: 0, daysLeft: 0 },
    totalUnits: 6
  },
  {
    daName: "Amaka",
    location: "Abuja",
    shampoo: { sku: "5497539000000484113", units: 8, daysLeft: 6 },
    pomade: { sku: "5497539000000483026", units: 3, daysLeft: 4 },
    conditioner: { sku: "5497539000000483001", units: 2, daysLeft: 3 },
    hydrationTea: { sku: "5497539000000484200", units: 4, daysLeft: 8 },
    totalUnits: 17
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

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Package className="h-5 w-5 text-blue-400" />
          DA Stock Health Summary (SKU Level)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-600">
                <TableHead className="text-slate-300">DA Name</TableHead>
                <TableHead className="text-slate-300">Location</TableHead>
                <TableHead className="text-slate-300">Shampoo (5497...113)</TableHead>
                <TableHead className="text-slate-300">Pomade (5497...026)</TableHead>
                <TableHead className="text-slate-300">Conditioner (5497...001)</TableHead>
                <TableHead className="text-slate-300">Hydration Tea (5497...200)</TableHead>
                <TableHead className="text-slate-300">Total Units</TableHead>
                <TableHead className="text-slate-300">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stockData.map((da, index) => {
                const criticalItems = [da.shampoo, da.pomade, da.conditioner, da.hydrationTea]
                  .filter(item => item.daysLeft <= 2).length;
                
                return (
                  <TableRow key={index} className="border-slate-600 hover:bg-slate-700/50">
                    <TableCell className="text-white font-medium">{da.daName}</TableCell>
                    <TableCell className="text-slate-300">{da.location}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-white font-medium">{da.shampoo.units} units</div>
                        <div className={`text-xs ${da.shampoo.daysLeft <= 2 ? 'text-red-400' : 'text-slate-400'}`}>
                          {getDaysLeftDisplay(da.shampoo.daysLeft)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-white font-medium">{da.pomade.units} units</div>
                        <div className={`text-xs ${da.pomade.daysLeft <= 2 ? 'text-red-400' : 'text-slate-400'}`}>
                          {getDaysLeftDisplay(da.pomade.daysLeft)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-white font-medium">{da.conditioner.units} units</div>
                        <div className={`text-xs ${da.conditioner.daysLeft <= 2 ? 'text-red-400' : 'text-slate-400'}`}>
                          {getDaysLeftDisplay(da.conditioner.daysLeft)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-white font-medium">{da.hydrationTea.units} units</div>
                        <div className={`text-xs ${da.hydrationTea.daysLeft <= 2 ? 'text-red-400' : 'text-slate-400'}`}>
                          {getDaysLeftDisplay(da.hydrationTea.daysLeft)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-white font-bold">{da.totalUnits}</TableCell>
                    <TableCell>
                      {criticalItems > 0 ? (
                        <Badge className="bg-red-500 text-white border-0">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          {criticalItems} Critical
                        </Badge>
                      ) : (
                        <Badge className="bg-green-500 text-white border-0">
                          ✅ Safe
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
  );
};

export default DAStockHealth;
