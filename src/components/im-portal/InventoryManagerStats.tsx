import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Users, Truck, Brain, TrendingUp } from 'lucide-react';

const InventoryManagerStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Pending POs</p>
              <p className="text-2xl font-bold text-yellow-400">5</p>
            </div>
            <FileText className="h-8 w-8 text-yellow-400" />
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
              <p className="text-slate-400 text-sm">Stock in Transit</p>
              <p className="text-2xl font-bold text-orange-400">243</p>
            </div>
            <Truck className="h-8 w-8 text-orange-400" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">AI Efficiency</p>
              <p className="text-2xl font-bold text-purple-400">94%</p>
            </div>
            <Brain className="h-8 w-8 text-purple-400" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Cost Savings</p>
              <p className="text-2xl font-bold text-green-400">₦2.4M</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-400" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryManagerStats;