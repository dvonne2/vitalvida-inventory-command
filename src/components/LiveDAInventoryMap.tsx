
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InventoryHeader from './InventoryHeader';
import LiveInventoryTab from './LiveInventoryTab';
import MapTab from './MapTab';
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

  const handleRefresh = () => {
    setLastRefresh(new Date());
    // Trigger data refresh logic here
    console.log('Manual refresh triggered');
  };

  return (
    <div className="space-y-6">
      <InventoryHeader 
        lastRefresh={lastRefresh}
        autoRefresh={autoRefresh}
        setAutoRefresh={setAutoRefresh}
        handleRefresh={handleRefresh}
      />

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
          <LiveInventoryTab inventoryData={inventoryData} />
        </TabsContent>

        <TabsContent value="map" className="space-y-4">
          <MapTab 
            stateData={stateData}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
          />
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <DAInventoryUpload onDataUpdate={setInventoryData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LiveDAInventoryMap;
