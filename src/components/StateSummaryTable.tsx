
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp } from 'lucide-react';

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

interface StateSummaryTableProps {
  stateData: StateData[];
  selectedState: string | null;
  setSelectedState: (state: string) => void;
}

const StateSummaryTable = ({ stateData, selectedState, setSelectedState }: StateSummaryTableProps) => {
  const formatCurrency = (amount: number) => {
    return `₦${(amount / 1000000).toFixed(1)}m`;
  };

  return (
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
  );
};

export default StateSummaryTable;
