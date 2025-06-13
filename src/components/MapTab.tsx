
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import NigeriaMap from './NigeriaMap';
import StateDetailsCard from './StateDetailsCard';
import StateSummaryTable from './StateSummaryTable';

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

interface MapTabProps {
  stateData: StateData[];
  selectedState: string | null;
  setSelectedState: (state: string) => void;
}

const MapTab = ({ stateData, selectedState, setSelectedState }: MapTabProps) => {
  const selectedStateData = stateData.find(state => state.name === selectedState);

  return (
    <div className="space-y-4">
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
        <StateDetailsCard 
          selectedState={selectedState}
          selectedStateData={selectedStateData}
        />
      </div>

      {/* State Summary Table */}
      <StateSummaryTable 
        stateData={stateData}
        selectedState={selectedState}
        setSelectedState={setSelectedState}
      />
    </div>
  );
};

export default MapTab;
