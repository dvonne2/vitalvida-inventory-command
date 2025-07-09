import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Package, TrendingUp, Clock, MapPin, AlertTriangle } from 'lucide-react';

const InventoryMovementTracker = () => {
  const [movements, setMovements] = useState([
    { id: 'MOV-001', item: 'Fulani Shampoo', quantity: 50, from: 'Warehouse A', to: 'DA-Lagos-01', status: 'in-transit', eta: '14:30' },
    { id: 'MOV-002', item: 'Hydration Tea', quantity: 100, from: 'Factory', to: 'Warehouse B', status: 'completed', eta: '12:00' },
    { id: 'MOV-003', item: 'Pomade', quantity: 25, from: 'DA-Abuja-02', to: 'Warehouse A', status: 'delayed', eta: '16:45' },
    { id: 'MOV-004', item: 'Hair Oil', quantity: 75, from: 'Warehouse B', to: 'DA-Kano-01', status: 'pending', eta: '18:00' },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500';
      case 'in-transit': return 'bg-blue-500/20 text-blue-400 border-blue-500';
      case 'delayed': return 'bg-red-500/20 text-red-400 border-red-500';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✅';
      case 'in-transit': return '🚛';
      case 'delayed': return '⚠️';
      case 'pending': return '⏳';
      default: return '📦';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <Package className="h-6 w-6 text-blue-400" />
            Real-Time Inventory Movement Tracker
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500">
              Live Tracking
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Summary Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 bg-slate-700/30 rounded-lg text-center">
              <p className="text-green-400 text-2xl font-bold">2</p>
              <p className="text-slate-300 text-sm">Completed</p>
            </div>
            <div className="p-4 bg-slate-700/30 rounded-lg text-center">
              <p className="text-blue-400 text-2xl font-bold">1</p>
              <p className="text-slate-300 text-sm">In Transit</p>
            </div>
            <div className="p-4 bg-slate-700/30 rounded-lg text-center">
              <p className="text-red-400 text-2xl font-bold">1</p>
              <p className="text-slate-300 text-sm">Delayed</p>
            </div>
            <div className="p-4 bg-slate-700/30 rounded-lg text-center">
              <p className="text-yellow-400 text-2xl font-bold">1</p>
              <p className="text-slate-300 text-sm">Pending</p>
            </div>
          </div>

          {/* Movement List */}
          <div className="space-y-3">
            {movements.map((movement) => (
              <div key={movement.id} className="p-4 bg-slate-700/30 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{getStatusIcon(movement.status)}</span>
                    <div>
                      <p className="text-white font-medium">{movement.item}</p>
                      <p className="text-slate-400 text-sm">{movement.id}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(movement.status)}>
                    {movement.status.replace('-', ' ')}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-300 text-sm">
                      {movement.from} → {movement.to}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-300 text-sm">ETA: {movement.eta}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-300 text-sm">Qty: {movement.quantity} units</span>
                  <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                    Track Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryMovementTracker;