import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, ArrowRight, CheckCircle, Clock, Zap } from 'lucide-react';

const OrderMovementOrchestrator = () => {
  const [orderId, setOrderId] = useState('');
  const [movements, setMovements] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrderMovements = async () => {
    if (!orderId) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/inventory/orders/${orderId}/movements`);
      const data = await response.json();
      setMovements(data);
    } catch (error) {
      console.error('Failed to fetch order movements:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500';
      case 'in-progress': return 'bg-blue-500/20 text-blue-400 border-blue-500';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      case 'failed': return 'bg-red-500/20 text-red-400 border-red-500';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'failed': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const hasBottlenecks = movements.some(m => m.status === 'failed' || 
    (m.status === 'pending' && new Date(m.created_at) < new Date(Date.now() - 30 * 60 * 1000)));

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-3">
          <ArrowRight className="h-6 w-6 text-emerald-400" />
          Order Movement Orchestrator
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500">
            Flow Management
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Order Search */}
        <div className="flex gap-2">
          <div className="flex-1">
            <Label className="text-slate-300">Order ID</Label>
            <Input
              placeholder="Enter order ID to track movements..."
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="bg-slate-700/50 border-slate-600 text-white"
              onKeyDown={(e) => e.key === 'Enter' && fetchOrderMovements()}
            />
          </div>
          <div className="flex items-end gap-2">
            <Button
              onClick={fetchOrderMovements}
              disabled={!orderId || isLoading}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {isLoading ? 'Loading...' : 'Track Movements'}
            </Button>
            {movements.length > 0 && (
              <Button className="bg-orange-600 hover:bg-orange-700">
                <Zap className="h-4 w-4 mr-2" />
                Expedite Order
              </Button>
            )}
          </div>
        </div>

        {/* Bottleneck Detection */}
        {hasBottlenecks && (
          <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <span className="text-red-400 font-medium">Bottleneck Detected</span>
            </div>
            <p className="text-red-300 text-sm">
              Some movements are experiencing delays or failures. Review the status below.
            </p>
          </div>
        )}

        {/* Movement Flow Diagram */}
        {movements.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-white font-medium">Movement Flow</h3>
            <div className="space-y-3">
              {movements.map((movement, index) => (
                <div key={index} className="relative">
                  <div className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-lg">
                    {/* Item Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-medium">{movement.item}</span>
                        {movement.status === 'failed' && (
                          <AlertTriangle className="h-4 w-4 text-red-400" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <span>{movement.source_bin}</span>
                        <ArrowRight className="h-3 w-3" />
                        <span>{movement.dest_bin}</span>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(movement.status)}>
                        {getStatusIcon(movement.status)}
                        <span className="ml-1">{movement.status?.toUpperCase()}</span>
                      </Badge>
                    </div>

                    {/* Progress Indicator */}
                    <div className="w-20">
                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            movement.status === 'completed' ? 'bg-green-500' :
                            movement.status === 'in-progress' ? 'bg-blue-500' :
                            movement.status === 'failed' ? 'bg-red-500' : 'bg-yellow-500'
                          }`}
                          style={{ 
                            width: movement.status === 'completed' ? '100%' :
                                   movement.status === 'in-progress' ? '60%' :
                                   movement.status === 'failed' ? '30%' : '20%'
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Connection Line */}
                  {index < movements.length - 1 && (
                    <div className="flex justify-center py-2">
                      <div className="w-0.5 h-4 bg-slate-600"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Movement Summary */}
        {movements.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-slate-700/30 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-400">
                {movements.filter(m => m.status === 'completed').length}
              </div>
              <div className="text-sm text-slate-400">Completed</div>
            </div>
            <div className="p-3 bg-slate-700/30 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-400">
                {movements.filter(m => m.status === 'in-progress').length}
              </div>
              <div className="text-sm text-slate-400">In Progress</div>
            </div>
            <div className="p-3 bg-slate-700/30 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {movements.filter(m => m.status === 'pending').length}
              </div>
              <div className="text-sm text-slate-400">Pending</div>
            </div>
            <div className="p-3 bg-slate-700/30 rounded-lg text-center">
              <div className="text-2xl font-bold text-red-400">
                {movements.filter(m => m.status === 'failed').length}
              </div>
              <div className="text-sm text-slate-400">Failed</div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        {movements.length > 0 && (
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 border-blue-500 text-blue-400 hover:bg-blue-500/20">
              Retry Failed
            </Button>
            <Button variant="outline" className="flex-1 border-yellow-500 text-yellow-400 hover:bg-yellow-500/20">
              Priority Queue
            </Button>
            <Button variant="outline" className="flex-1 border-green-500 text-green-400 hover:bg-green-500/20">
              Mark Complete
            </Button>
          </div>
        )}

        {/* No Data State */}
        {movements.length === 0 && !isLoading && orderId && (
          <div className="p-4 bg-yellow-500/20 border border-yellow-500 rounded-lg">
            <p className="text-yellow-400">No movements found for order {orderId}.</p>
            <p className="text-yellow-300 text-sm mt-1">Order may not exist or has no inventory movements yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderMovementOrchestrator;