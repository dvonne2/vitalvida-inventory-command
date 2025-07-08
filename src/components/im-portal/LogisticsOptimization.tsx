
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MapPin, Route, Clock, Truck, Navigation, Zap, BarChart3 } from 'lucide-react';

interface DeliveryRoute {
  id: string;
  name: string;
  destinations: string[];
  distance: number;
  estimatedTime: number;
  cost: number;
  efficiency: number;
  status: 'planned' | 'in_progress' | 'completed';
  driver?: string;
  vehicleId?: string;
}

interface OptimizationMetrics {
  totalRoutes: number;
  averageEfficiency: number;
  timeSaved: number;
  costReduction: number;
}

const LogisticsOptimization = () => {
  const [routes] = useState<DeliveryRoute[]>([
    {
      id: '1',
      name: 'Lagos Central Circuit',
      destinations: ['Femi - Ikeja', 'Kemi - Victoria Island', 'Tunde - Lekki'],
      distance: 45,
      estimatedTime: 180,
      cost: 12500,
      efficiency: 92,
      status: 'in_progress',
      driver: 'Adebayo',
      vehicleId: 'VV-001'
    },
    {
      id: '2',
      name: 'Abuja Express Route',
      destinations: ['Amaka - Wuse', 'Ibrahim - Garki'],
      distance: 28,
      estimatedTime: 120,
      cost: 8500,
      efficiency: 88,
      status: 'planned',
      driver: 'Fatima',
      vehicleId: 'VV-002'
    },
    {
      id: '3',
      name: 'Port Harcourt Loop',
      destinations: ['Chidi - GRA', 'Emeka - Trans Amadi'],
      distance: 22,
      estimatedTime: 90,
      cost: 7000,
      efficiency: 95,
      status: 'completed',
      driver: 'Samuel',
      vehicleId: 'VV-003'
    }
  ]);

  const [metrics] = useState<OptimizationMetrics>({
    totalRoutes: 3,
    averageEfficiency: 92,
    timeSaved: 45,
    costReduction: 18
  });

  const optimizeRoute = (routeId: string) => {
    console.log(`Optimizing route: ${routeId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planned': return 'bg-blue-500/20 text-blue-400 border-blue-500';
      case 'in_progress': return 'bg-orange-500/20 text-orange-400 border-orange-500';
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500';
    }
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return 'text-green-400';
    if (efficiency >= 80) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <Route className="h-6 w-6 text-indigo-400" />
            Optimized Logistics Integration
            <Badge className="bg-indigo-500/20 text-indigo-400 border-indigo-500">
              AI Route Planning
            </Badge>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Optimization Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Active Routes</p>
                <p className="text-2xl font-bold text-blue-400">{metrics.totalRoutes}</p>
              </div>
              <Navigation className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Avg Efficiency</p>
                <p className={`text-2xl font-bold ${getEfficiencyColor(metrics.averageEfficiency)}`}>
                  {metrics.averageEfficiency}%
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Time Saved</p>
                <p className="text-2xl font-bold text-purple-400">{metrics.timeSaved}min</p>
              </div>
              <Clock className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Cost Reduction</p>
                <p className="text-2xl font-bold text-orange-400">{metrics.costReduction}%</p>
              </div>
              <Zap className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Route Optimization Dashboard */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-lg flex items-center gap-2">
            <MapPin className="h-5 w-5 text-indigo-400" />
            Smart Route Planning & Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {routes.map((route) => (
              <div key={route.id} className="bg-slate-700/30 rounded-lg p-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-white font-medium">{route.name}</h4>
                      <Badge className={getStatusColor(route.status)}>
                        {route.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      {route.destinations.map((dest, index) => (
                        <div key={index} className="text-sm text-slate-400">
                          📍 {dest}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-slate-400 text-sm mb-2">Route Metrics</p>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Distance:</span>
                        <span className="text-white">{route.distance}km</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Time:</span>
                        <span className="text-white">{route.estimatedTime}min</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Cost:</span>
                        <span className="text-white">₦{route.cost.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-slate-400 text-sm mb-2">Efficiency Score</p>
                    <div className="flex items-center gap-2 mb-2">
                      <Progress value={route.efficiency} className="flex-1" />
                      <span className={`text-sm font-medium ${getEfficiencyColor(route.efficiency)}`}>
                        {route.efficiency}%
                      </span>
                    </div>
                    {route.driver && (
                      <div className="text-sm">
                        <p className="text-slate-400">Driver: <span className="text-white">{route.driver}</span></p>
                        <p className="text-slate-400">Vehicle: <span className="text-white">{route.vehicleId}</span></p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button
                      size="sm"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white"
                      onClick={() => optimizeRoute(route.id)}
                    >
                      <Zap className="h-4 w-4 mr-1" />
                      Optimize
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-slate-300 border-slate-600 hover:bg-slate-700"
                    >
                      <Truck className="h-4 w-4 mr-1" />
                      Track Live
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Real-Time Tracking */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-lg flex items-center gap-2">
            <Truck className="h-5 w-5 text-orange-400" />
            Live Vehicle Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-medium">VV-001</h4>
                <Badge className="bg-green-500/20 text-green-400">Active</Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Current Location:</span>
                  <span className="text-white">Ikeja</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Next Stop:</span>
                  <span className="text-white">Victoria Island</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">ETA:</span>
                  <span className="text-green-400">45 min</span>
                </div>
                <Progress value={65} className="mt-2" />
                <p className="text-xs text-slate-400">65% route completed</p>
              </div>
            </div>

            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-medium">VV-002</h4>
                <Badge className="bg-blue-500/20 text-blue-400">Standby</Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Location:</span>
                  <span className="text-white">Depot</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Next Departure:</span>
                  <span className="text-white">2:30 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Route:</span>
                  <span className="text-blue-400">Abuja Express</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-medium">VV-003</h4>
                <Badge className="bg-green-500/20 text-green-400">Completed</Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Route:</span>
                  <span className="text-white">Port Harcourt</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Completed:</span>
                  <span className="text-green-400">1:45 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Efficiency:</span>
                  <span className="text-green-400">95%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LogisticsOptimization;
