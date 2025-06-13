
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users } from 'lucide-react';

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

interface StateDetailsCardProps {
  selectedState: string | null;
  selectedStateData: StateData | undefined;
}

const StateDetailsCard = ({ selectedState, selectedStateData }: StateDetailsCardProps) => {
  const formatCurrency = (amount: number) => {
    return `₦${(amount / 1000000).toFixed(1)}m`;
  };

  const getDaysLeftColor = (daysLeft: number) => {
    if (daysLeft < 2) return 'text-red-500 bg-red-100';
    if (daysLeft <= 5) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  return (
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
  );
};

export default StateDetailsCard;
