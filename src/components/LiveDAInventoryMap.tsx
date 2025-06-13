import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw, MapPin, Upload, Users, Package, TrendingUp, AlertTriangle } from 'lucide-react';
import NigeriaMap from './NigeriaMap';
import DAInventoryUpload from './DAInventoryUpload';

interface DAInventory {
  id: string;
  name: string;
  location: string;
  state: string;
  shampoo: number;
  pomade: number;
  conditioner: number;
  hydrationTea: number;
  unitsTotal: number;
  daysLeft: number;
  lastUpdated: Date;
}

interface StateData {
  name: string;
  unitsInStock: number;
  unitsSoldThisMonth: number;
  unsoldPercentage: number;
  revenue: number;
  das: DAInventory[];
}

const LiveDAInventoryMap = () => {
  const [inventoryData, setInventoryData] = useState<DAInventory[]>([]);
  const [stateData, setStateData] = useState<StateData[]>([]);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Mock data - replace with actual data fetching
  useEffect(() => {
    const mockInventoryData: DAInventory[] = [
      {
        id: '1',
        name: 'Femi',
        location: 'Lagos Island',
        state: 'Lagos',
        shampoo: 3,
        pomade: 2,
        conditioner: 4,
        hydrationTea: 1,
        unitsTotal: 10,
        daysLeft: 2,
        lastUpdated: new Date()
      },
      {
        id: '2',
        name: 'Tobi',
        location: 'Abeokuta',
        state: 'Ogun',
        shampoo: 0,
        pomade: 5,
        conditioner: 1,
        hydrationTea: 0,
        unitsTotal: 6,
        daysLeft: 1,
        lastUpdated: new Date()
      },
      {
        id: '3',
        name: 'Amaka',
        location: 'Wuse',
        state: 'FCT',
        shampoo: 8,
        pomade: 12,
        conditioner: 6,
        hydrationTea: 4,
        unitsTotal: 30,
        daysLeft: 7,
        lastUpdated: new Date()
      },
      {
        id: '4',
        name: 'Kemi',
        location: 'Victoria Island',
        state: 'Lagos',
        shampoo: 2,
        pomade: 3,
        conditioner: 2,
        hydrationTea: 1,
        unitsTotal: 8,
        daysLeft: 3,
        lastUpdated: new Date()
      }
    ];

    const mockStateData: StateData[] = [
      {
        name: 'Lagos',
        unitsInStock: 4000,
        unitsSoldThisMonth: 2500,
        unsoldPercentage: 38,
        revenue: 2100000,
        das: mockInventoryData.filter(da => da.state === 'Lagos')
      },
      {
        name: 'Ogun',
        unitsInStock: 1000,
        unitsSoldThisMonth: 180,
        unsoldPercentage: 82,
        revenue: 320000,
        das: mockInventoryData.filter(da => da.state === 'Ogun')
      },
      {
        name: 'FCT',
        unitsInStock: 2500,
        unitsSoldThisMonth: 1800,
        unsoldPercentage: 28,
        revenue: 1800000,
        das: mockInventoryData.filter(da => da.state === 'FCT')
      }
    ];

    setInventoryData(mockInventoryData);
    setStateData(mockStateData);
  }, []);

  // Auto-refresh functionality
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setLastRefresh(new Date());
      // Simulate data refresh
      console.log('Auto-refreshing inventory data...');
    }, 15 * 60 * 1000); // 15 minutes

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const getDaysLeftColor = (daysLeft: number) => {
    if (daysLeft < 2) return 'text-red-500 bg-red-100';
    if (daysLeft <= 5) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getStockLevelColor = (quantity: number) => {
    if (quantity === 0) return 'text-red-500';
    if (quantity < 3) return 'text-yellow-600';
    return 'text-green-600';
  };

  const formatCurrency = (amount: number) => {
    return `₦${(amount / 1000000).toFixed(1)}m`;
  };

  const handleRefresh = () => {
    setLastRefresh(new Date());
    // Trigger data refresh logic here
    console.log('Manual refresh triggered');
  };

  const selectedStateData = stateData.find(state => state.name === selectedState);

  return (
    <div className="space-y-6">
      {/* Header with controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Live DA Inventory & Nigeria Map Overview</h2>
          <p className="text-slate-300 text-sm">
            Real-time stock levels per DA • Last updated: {lastRefresh.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge 
            variant={autoRefresh ? "default" : "secondary"} 
            className="cursor-pointer"
            onClick={() => setAutoRefresh(!autoRefresh)}
          >
            {autoRefresh ? '🔄 Auto-refresh ON' : '⏸️ Auto-refresh OFF'}
          </Badge>
          <Button onClick={handleRefresh} variant="outline" size="sm" className="text-slate-300 border-slate-600">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Now
          </Button>
        </div>
      </div>

      <Tabs defaultValue="inventory" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border border-slate-700">
          <TabsTrigger value="inventory" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            📦 Live Inventory
          </TabsTrigger>
          <TabsTrigger value="map" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
            🗺️ Nigeria Map
          </TabsTrigger>
          <TabsTrigger value="upload" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            📊 Data Upload
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Package className="h-5 w-5 text-blue-400" />
                Live DA Inventory (SKU Level)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700">
                      <TableHead className="text-slate-300">DA Name</TableHead>
                      <TableHead className="text-slate-300">Location</TableHead>
                      <TableHead className="text-slate-300 text-center">Shampoo</TableHead>
                      <TableHead className="text-slate-300 text-center">Pomade</TableHead>
                      <TableHead className="text-slate-300 text-center">Conditioner</TableHead>
                      <TableHead className="text-slate-300 text-center">Hydration Tea</TableHead>
                      <TableHead className="text-slate-300 text-center">Total Units</TableHead>
                      <TableHead className="text-slate-300 text-center">Days Left</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventoryData.map((da) => (
                      <TableRow key={da.id} className="border-slate-700 hover:bg-slate-700/30">
                        <TableCell className="font-medium text-white">{da.name}</TableCell>
                        <TableCell className="text-slate-300">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {da.location}, {da.state}
                          </div>
                        </TableCell>
                        <TableCell className={`text-center font-medium ${getStockLevelColor(da.shampoo)}`}>
                          {da.shampoo}
                        </TableCell>
                        <TableCell className={`text-center font-medium ${getStockLevelColor(da.pomade)}`}>
                          {da.pomade}
                        </TableCell>
                        <TableCell className={`text-center font-medium ${getStockLevelColor(da.conditioner)}`}>
                          {da.conditioner}
                        </TableCell>
                        <TableCell className={`text-center font-medium ${getStockLevelColor(da.hydrationTea)}`}>
                          {da.hydrationTea}
                        </TableCell>
                        <TableCell className="text-center font-medium text-white">{da.unitsTotal}</TableCell>
                        <TableCell className="text-center">
                          <Badge className={`${getDaysLeftColor(da.daysLeft)} border-0`}>
                            {da.daysLeft < 2 && <AlertTriangle className="h-3 w-3 mr-1" />}
                            {da.daysLeft} days
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="map" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map */}
            <Card className="lg:col-span-2 bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  🗺️ Nigeria - Inventory vs Sales by State
                </CardTitle>
              </CardHeader>
              <CardContent>
                <NigeriaMap 
                  stateData={stateData} 
                  onStateClick={setSelectedState}
                  selectedState={selectedState}
                />
              </CardContent>
            </Card>

            {/* State Details */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">
                  {selectedState ? `${selectedState} State Details` : 'Select a State'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedStateData ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-slate-700/30 rounded">
                        <p className="text-slate-400 text-xs">Units in Stock</p>
                        <p className="text-white font-bold text-lg">{selectedStateData.unitsInStock.toLocaleString()}</p>
                      </div>
                      <div className="text-center p-3 bg-slate-700/30 rounded">
                        <p className="text-slate-400 text-xs">Units Sold</p>
                        <p className="text-white font-bold text-lg">{selectedStateData.unitsSoldThisMonth.toLocaleString()}</p>
                      </div>
                      <div className="text-center p-3 bg-slate-700/30 rounded">
                        <p className="text-slate-400 text-xs">Unsold %</p>
                        <p className={`font-bold text-lg ${selectedStateData.unsoldPercentage > 70 ? 'text-red-400' : selectedStateData.unsoldPercentage > 50 ? 'text-yellow-400' : 'text-green-400'}`}>
                          {selectedStateData.unsoldPercentage}%
                        </p>
                      </div>
                      <div className="text-center p-3 bg-slate-700/30 rounded">
                        <p className="text-slate-400 text-xs">Revenue</p>
                        <p className="text-white font-bold text-lg">{formatCurrency(selectedStateData.revenue)}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        DAs in {selectedState} ({selectedStateData.das.length})
                      </h4>
                      <div className="space-y-2">
                        {selectedStateData.das.map((da) => (
                          <div key={da.id} className="flex items-center justify-between p-2 bg-slate-700/20 rounded text-sm">
                            <span className="text-white">{da.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400">{da.unitsTotal} units</span>
                              <Badge className={`${getDaysLeftColor(da.daysLeft)} border-0 text-xs`}>
                                {da.daysLeft}d
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MapPin className="h-12 w-12 text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-400">Click on a state in the map to view detailed inventory and sales data</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* State Summary Table */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                State Performance Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-300">State</TableHead>
                    <TableHead className="text-slate-300 text-right">Units in Stock</TableHead>
                    <TableHead className="text-slate-300 text-right">Units Sold This Month</TableHead>
                    <TableHead className="text-slate-300 text-right">Unsold %</TableHead>
                    <TableHead className="text-slate-300 text-right">Revenue</TableHead>
                    <TableHead className="text-slate-300 text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stateData.map((state) => (
                    <TableRow 
                      key={state.name} 
                      className={`border-slate-700 hover:bg-slate-700/30 cursor-pointer ${selectedState === state.name ? 'bg-slate-700/50' : ''}`}
                      onClick={() => setSelectedState(state.name)}
                    >
                      <TableCell className="font-medium text-white">{state.name}</TableCell>
                      <TableCell className="text-right text-slate-300">{state.unitsInStock.toLocaleString()}</TableCell>
                      <TableCell className="text-right text-slate-300">{state.unitsSoldThisMonth.toLocaleString()}</TableCell>
                      <TableCell className={`text-right font-medium ${state.unsoldPercentage > 70 ? 'text-red-400' : state.unsoldPercentage > 50 ? 'text-yellow-400' : 'text-green-400'}`}>
                        {state.unsoldPercentage}%
                      </TableCell>
                      <TableCell className="text-right text-slate-300">{formatCurrency(state.revenue)}</TableCell>
                      <TableCell className="text-center">
                        <Badge className={`border-0 ${
                          state.unsoldPercentage > 70 ? 'bg-red-500' : 
                          state.unitsInStock < 1000 ? 'bg-yellow-500' : 
                          'bg-green-500'
                        }`}>
                          {state.unsoldPercentage > 70 ? 'Overstocked' : 
                           state.unitsInStock < 1000 ? 'Understocked' : 
                           'Balanced'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <DAInventoryUpload onDataUpdate={setInventoryData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LiveDAInventoryMap;
