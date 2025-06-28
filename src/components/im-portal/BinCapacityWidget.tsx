
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Package, AlertTriangle, CheckCircle } from 'lucide-react';

const BinCapacityWidget = () => {
  const binData = [
    {
      id: 'bin_a',
      name: 'Bin A - Shampoo',
      capacity: 1000,
      current: 850,
      product: 'Fulani Shampoo',
      status: 'high'
    },
    {
      id: 'bin_b',
      name: 'Bin B - Pomade',
      capacity: 800,
      current: 240,
      product: 'Pomade',
      status: 'normal'
    },
    {
      id: 'bin_c',
      name: 'Bin C - Conditioner',
      capacity: 600,
      current: 580,
      product: 'Conditioner',
      status: 'critical'
    },
    {
      id: 'bin_d',
      name: 'Bin D - Hydration Tea',
      capacity: 400,
      current: 120,
      product: 'Hydration Tea',
      status: 'normal'
    }
  ];

  const getCapacityPercentage = (current: number, capacity: number) => {
    return Math.round((current / capacity) * 100);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case 'normal':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      default:
        return <Package className="h-4 w-4 text-gray-400" />;
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const totalCapacity = binData.reduce((sum, bin) => sum + bin.capacity, 0);
  const totalCurrent = binData.reduce((sum, bin) => sum + bin.current, 0);
  const overallPercentage = getCapacityPercentage(totalCurrent, totalCapacity);

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Package className="h-5 w-5 text-green-400" />
          Bin Capacity Monitor
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Overall Capacity */}
          <div className="p-4 bg-slate-700/30 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-white font-medium">Overall Capacity</h3>
              <span className="text-white font-bold">{overallPercentage}%</span>
            </div>
            <Progress 
              value={overallPercentage} 
              className="h-3"
            />
            <p className="text-slate-400 text-sm mt-1">
              {totalCurrent.toLocaleString()} / {totalCapacity.toLocaleString()} units
            </p>
          </div>

          {/* Individual Bins */}
          <div className="space-y-3">
            {binData.map((bin) => {
              const percentage = getCapacityPercentage(bin.current, bin.capacity);
              return (
                <div key={bin.id} className="p-3 bg-slate-700/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(bin.status)}
                      <span className="text-slate-300 text-sm font-medium">{bin.name}</span>
                    </div>
                    <span className="text-white text-sm font-bold">{percentage}%</span>
                  </div>
                  <Progress 
                    value={percentage} 
                    className="h-2 mb-1"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>{bin.current.toLocaleString()} units</span>
                    <span>Max: {bin.capacity.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Alerts */}
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <span className="text-red-400 font-medium text-sm">Capacity Alert</span>
            </div>
            <p className="text-red-300 text-xs">
              Bin C (Conditioner) is at {getCapacityPercentage(binData[2].current, binData[2].capacity)}% capacity. Consider redistribution.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BinCapacityWidget;
