
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Users, Shield, DollarSign, Trophy } from 'lucide-react';

const QuickStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Critical Alerts</p>
              <p className="text-2xl font-bold text-red-400">3</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-400" />
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
              <p className="text-slate-400 text-sm">SKU Accuracy</p>
              <p className="text-2xl font-bold text-yellow-400">87%</p>
            </div>
            <Shield className="h-8 w-8 text-yellow-400" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Cash Locked</p>
              <p className="text-2xl font-bold text-orange-400">₦304k</p>
            </div>
            <DollarSign className="h-8 w-8 text-orange-400" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Top Performer</p>
              <p className="text-2xl font-bold text-green-400">Femi</p>
            </div>
            <Trophy className="h-8 w-8 text-green-400" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickStats;
