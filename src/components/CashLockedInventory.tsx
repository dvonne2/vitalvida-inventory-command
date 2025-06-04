
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { DollarSign } from 'lucide-react';

const pieData = [
  { name: 'Cash Collected', value: 157500, color: '#10B981' },
  { name: 'Stock in DA Hands', value: 89000, color: '#F59E0B' },
  { name: 'Delivered but Not Paid', value: 45000, color: '#EF4444' },
  { name: 'Lost/Unverified', value: 12500, color: '#6B7280' }
];

const tableData = [
  {
    da: "Femi",
    inventorySent: 50000,
    soldAndPaid: 37500,
    unpaidStock: 12500,
    pendingPayment: "1 conditioner",
    totalCashLocked: 12500
  },
  {
    da: "Tobi",
    inventorySent: 35000,
    soldAndPaid: 20000,
    unpaidStock: 15000,
    pendingPayment: "2 pomades",
    totalCashLocked: 15000
  },
  {
    da: "Amaka",
    inventorySent: 42000,
    soldAndPaid: 38000,
    unpaidStock: 4000,
    pendingPayment: "1 shampoo",
    totalCashLocked: 4000
  },
  {
    da: "Chidi",
    inventorySent: 28000,
    soldAndPaid: 15000,
    unpaidStock: 13000,
    pendingPayment: "3 mixed items",
    totalCashLocked: 13000
  }
];

const CashLockedInventory = () => {
  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString()}`;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-800 border border-slate-600 rounded-lg p-3">
          <p className="text-white font-medium">{data.name}</p>
          <p className="text-blue-400">{formatCurrency(data.value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-yellow-400" />
            Cash-Locked Inventory Report
          </CardTitle>
          <p className="text-slate-400 text-sm">
            Visual breakdown of inventory value status across all DAs
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-4">
              {pieData.map((item, index) => (
                <div key={index} className="p-4 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-slate-300 text-sm">{item.name}</span>
                  </div>
                  <p className="text-white text-xl font-bold">{formatCurrency(item.value)}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Table */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">DA-Level Cash Flow Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-600">
                  <TableHead className="text-slate-300">DA</TableHead>
                  <TableHead className="text-slate-300">Inventory Sent</TableHead>
                  <TableHead className="text-slate-300">Sold & Paid</TableHead>
                  <TableHead className="text-slate-300">Unpaid Stock</TableHead>
                  <TableHead className="text-slate-300">Pending Payment</TableHead>
                  <TableHead className="text-slate-300">Total Cash-Locked</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((row, index) => {
                  const conversionRate = (row.soldAndPaid / row.inventorySent) * 100;
                  return (
                    <TableRow key={index} className="border-slate-600 hover:bg-slate-700/50">
                      <TableCell className="text-white font-medium">{row.da}</TableCell>
                      <TableCell className="text-blue-400">{formatCurrency(row.inventorySent)}</TableCell>
                      <TableCell className="text-green-400">{formatCurrency(row.soldAndPaid)}</TableCell>
                      <TableCell className="text-yellow-400">{formatCurrency(row.unpaidStock)}</TableCell>
                      <TableCell className="text-slate-300">{row.pendingPayment}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <span className={`font-bold ${row.totalCashLocked > 10000 ? 'text-red-400' : 'text-yellow-400'}`}>
                            {formatCurrency(row.totalCashLocked)}
                          </span>
                          <div className="text-xs text-slate-400">
                            {conversionRate.toFixed(1)}% converted
                          </div>
                        </div>
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

export default CashLockedInventory;
