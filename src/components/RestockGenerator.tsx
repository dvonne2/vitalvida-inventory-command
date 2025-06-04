
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Package, MessageSquare, Calculator, TrendingUp } from 'lucide-react';

const restockSuggestions = [
  {
    da: "Femi",
    product: "Shampoo",
    currentStock: 3,
    avgDailySales: 2.5,
    suggestedRestock: 6,
    safetyBuffer: 3,
    reasoning: "2 days remaining, high sales velocity"
  },
  {
    da: "Amaka",
    product: "Pomade",
    currentStock: 1,
    avgDailySales: 1.8,
    suggestedRestock: 4,
    safetyBuffer: 3,
    reasoning: "Low stock, moderate sales pace"
  },
  {
    da: "Chidi",
    product: "All Products",
    currentStock: 1,
    avgDailySales: 0,
    suggestedRestock: 10,
    safetyBuffer: 3,
    reasoning: "Emergency restock - completely out"
  },
  {
    da: "Ibrahim",
    product: "Conditioner",
    currentStock: 3,
    avgDailySales: 2.2,
    suggestedRestock: 5,
    safetyBuffer: 3,
    reasoning: "Preventive restock before critical level"
  },
  {
    da: "Kemi",
    product: "Hair Oil",
    currentStock: 4,
    avgDailySales: 1.5,
    suggestedRestock: 3,
    safetyBuffer: 3,
    reasoning: "Maintain optimal inventory level"
  }
];

const RestockGenerator = () => {
  const totalSuggestedUnits = restockSuggestions.reduce((sum, item) => sum + item.suggestedRestock, 0);
  const urgentRestocks = restockSuggestions.filter(item => item.currentStock <= 2).length;

  const handleWhatsAppDispatch = (da: string, product: string, quantity: number) => {
    const message = `Restock Request for DA ${da}: ${quantity} units of ${product}. Priority dispatch needed.`;
    console.log(`WhatsApp dispatch: ${message}`);
  };

  const handleApproveAll = () => {
    console.log('Approving all restock suggestions');
  };

  const getPriorityColor = (currentStock: number) => {
    if (currentStock <= 1) return "text-red-400";
    if (currentStock <= 2) return "text-yellow-400";
    return "text-green-400";
  };

  return (
    <div className="space-y-6">
      {/* Restock Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Suggested Units</p>
                <p className="text-2xl font-bold text-blue-400">{totalSuggestedUnits}</p>
              </div>
              <Package className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Urgent Restocks</p>
                <p className="text-2xl font-bold text-red-400">{urgentRestocks}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">DAs Needing Restock</p>
                <p className="text-2xl font-bold text-yellow-400">{restockSuggestions.length}</p>
              </div>
              <Calculator className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Algorithm Explanation */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Auto-Calculation Logic</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-blue-500/20 border border-blue-500 rounded-lg">
              <p className="text-blue-400 font-medium">📊 Past 7-day sales velocity</p>
              <p className="text-slate-300">Analyzes recent sales patterns</p>
            </div>
            <div className="p-3 bg-green-500/20 border border-green-500 rounded-lg">
              <p className="text-green-400 font-medium">📦 Current units left</p>
              <p className="text-slate-300">Real-time inventory levels</p>
            </div>
            <div className="p-3 bg-purple-500/20 border border-purple-500 rounded-lg">
              <p className="text-purple-400 font-medium">🛡️ Safety buffer (3 days min)</p>
              <p className="text-slate-300">Prevents emergency stock-outs</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Restock Suggestions Table */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-400" />
              Suggested Restock Generator
            </CardTitle>
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={handleApproveAll}
            >
              Approve All Restocks
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700 hover:bg-slate-700/50">
                  <TableHead className="text-slate-300">DA</TableHead>
                  <TableHead className="text-slate-300">Product</TableHead>
                  <TableHead className="text-slate-300">Current Stock</TableHead>
                  <TableHead className="text-slate-300">Avg Daily Sales</TableHead>
                  <TableHead className="text-slate-300">Suggested Restock</TableHead>
                  <TableHead className="text-slate-300">Reasoning</TableHead>
                  <TableHead className="text-slate-300">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {restockSuggestions.map((item, index) => (
                  <TableRow key={index} className="border-slate-700 hover:bg-slate-700/30 transition-colors">
                    <TableCell className="text-white font-medium">{item.da}</TableCell>
                    <TableCell className="text-slate-300">{item.product}</TableCell>
                    <TableCell className={`text-center font-bold ${getPriorityColor(item.currentStock)}`}>
                      {item.currentStock}
                    </TableCell>
                    <TableCell className="text-center text-slate-300">{item.avgDailySales}</TableCell>
                    <TableCell className="text-center">
                      <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500">
                        {item.suggestedRestock} units
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-slate-300 max-w-xs">
                      {item.reasoning}
                    </TableCell>
                    <TableCell>
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleWhatsAppDispatch(item.da, item.product, item.suggestedRestock)}
                      >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Dispatch
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RestockGenerator;
