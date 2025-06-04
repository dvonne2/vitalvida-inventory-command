
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, Clock } from 'lucide-react';

const stockData = [
  {
    daName: "Femi",
    state: "Lagos",
    shampoo: 3,
    pomade: 2,
    conditioner: 4,
    hairOil: 1,
    totalUnits: 10,
    soldThisWeek: 20,
    daysToStockOut: 2,
    riskLevel: "Critical",
    riskColor: "bg-red-500"
  },
  {
    daName: "Amaka",
    state: "Enugu",
    shampoo: 5,
    pomade: 1,
    conditioner: 0,
    hairOil: 2,
    totalUnits: 8,
    soldThisWeek: 8,
    daysToStockOut: 4,
    riskLevel: "At Risk",
    riskColor: "bg-yellow-500"
  },
  {
    daName: "Chidi",
    state: "Abuja",
    shampoo: 0,
    pomade: 0,
    conditioner: 1,
    hairOil: 0,
    totalUnits: 1,
    soldThisWeek: 0,
    daysToStockOut: 0,
    riskLevel: "Urgent",
    riskColor: "bg-red-600"
  },
  {
    daName: "Kemi",
    state: "Port Harcourt",
    shampoo: 8,
    pomade: 6,
    conditioner: 7,
    hairOil: 4,
    totalUnits: 25,
    soldThisWeek: 15,
    daysToStockOut: 7,
    riskLevel: "Good",
    riskColor: "bg-green-500"
  },
  {
    daName: "Ibrahim",
    state: "Kano",
    shampoo: 2,
    pomade: 1,
    conditioner: 3,
    hairOil: 2,
    totalUnits: 8,
    soldThisWeek: 12,
    daysToStockOut: 3,
    riskLevel: "At Risk",
    riskColor: "bg-yellow-500"
  }
];

const StockHealthTable = () => {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-blue-400" />
          DA Stock Health Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700 hover:bg-slate-700/50">
                <TableHead className="text-slate-300">DA Name</TableHead>
                <TableHead className="text-slate-300">State</TableHead>
                <TableHead className="text-slate-300">Shampoo</TableHead>
                <TableHead className="text-slate-300">Pomade</TableHead>
                <TableHead className="text-slate-300">Conditioner</TableHead>
                <TableHead className="text-slate-300">Hair Oil</TableHead>
                <TableHead className="text-slate-300">Total Units</TableHead>
                <TableHead className="text-slate-300">Sold This Week</TableHead>
                <TableHead className="text-slate-300">Days to Stock-Out</TableHead>
                <TableHead className="text-slate-300">Risk Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stockData.map((da, index) => (
                <TableRow key={index} className="border-slate-700 hover:bg-slate-700/30 transition-colors">
                  <TableCell className="text-white font-medium">{da.daName}</TableCell>
                  <TableCell className="text-slate-300">{da.state}</TableCell>
                  <TableCell className={`text-center ${da.shampoo === 0 ? 'text-red-400 font-bold' : da.shampoo <= 2 ? 'text-yellow-400' : 'text-green-400'}`}>
                    {da.shampoo}
                  </TableCell>
                  <TableCell className={`text-center ${da.pomade === 0 ? 'text-red-400 font-bold' : da.pomade <= 2 ? 'text-yellow-400' : 'text-green-400'}`}>
                    {da.pomade}
                  </TableCell>
                  <TableCell className={`text-center ${da.conditioner === 0 ? 'text-red-400 font-bold' : da.conditioner <= 2 ? 'text-yellow-400' : 'text-green-400'}`}>
                    {da.conditioner}
                  </TableCell>
                  <TableCell className={`text-center ${da.hairOil === 0 ? 'text-red-400 font-bold' : da.hairOil <= 2 ? 'text-yellow-400' : 'text-green-400'}`}>
                    {da.hairOil}
                  </TableCell>
                  <TableCell className="text-white font-medium">{da.totalUnits}</TableCell>
                  <TableCell className="text-blue-400">{da.soldThisWeek}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <span className={`font-bold ${da.daysToStockOut <= 2 ? 'text-red-400' : da.daysToStockOut <= 4 ? 'text-yellow-400' : 'text-green-400'}`}>
                        {da.daysToStockOut === 0 ? 'Out' : `${da.daysToStockOut} days`}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${da.riskColor} text-white border-0`}>
                      {da.riskLevel === "Critical" ? "🔴" : da.riskLevel === "Urgent" ? "🔥" : da.riskLevel === "At Risk" ? "🟡" : "✅"} {da.riskLevel}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockHealthTable;
