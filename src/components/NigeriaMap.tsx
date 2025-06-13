
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StateData {
  name: string;
  unitsInStock: number;
  unitsSoldThisMonth: number;
  unsoldPercentage: number;
  revenue: number;
  das: any[];
}

interface NigeriaMapProps {
  stateData: StateData[];
  onStateClick: (stateName: string) => void;
  selectedState: string | null;
}

const NigeriaMap: React.FC<NigeriaMapProps> = ({ stateData, onStateClick, selectedState }) => {
  const getStateColor = (stateName: string) => {
    const state = stateData.find(s => s.name === stateName);
    if (!state) return '#64748B'; // Default gray for states without data
    
    if (state.unsoldPercentage > 70) return '#EF4444'; // Red - Overstocked
    if (state.unitsInStock < 1000 && state.unitsSoldThisMonth > 100) return '#F59E0B'; // Yellow - Understocked
    return '#10B981'; // Green - Balanced
  };

  const getStateOpacity = (stateName: string) => {
    return selectedState === stateName ? 1 : 0.8;
  };

  const nigerianStates = [
    { name: 'Lagos', x: 165, y: 280, width: 40, height: 30 },
    { name: 'Ogun', x: 140, y: 260, width: 50, height: 40 },
    { name: 'FCT', x: 240, y: 190, width: 35, height: 25 },
    { name: 'Kano', x: 280, y: 120, width: 60, height: 45 },
    { name: 'Rivers', x: 200, y: 320, width: 55, height: 40 },
    { name: 'Kaduna', x: 220, y: 140, width: 65, height: 50 },
    { name: 'Oyo', x: 120, y: 230, width: 50, height: 45 },
    { name: 'Delta', x: 170, y: 300, width: 45, height: 35 },
    { name: 'Imo', x: 210, y: 290, width: 35, height: 30 },
    { name: 'Anambra', x: 220, y: 270, width: 40, height: 35 },
    { name: 'Plateau', x: 260, y: 170, width: 50, height: 40 },
    { name: 'Cross River', x: 280, y: 320, width: 45, height: 50 },
    { name: 'Benue', x: 250, y: 200, width: 70, height: 45 },
    { name: 'Niger', x: 180, y: 150, width: 80, height: 60 },
    { name: 'Kwara', x: 160, y: 190, width: 60, height: 40 },
    { name: 'Sokoto', x: 120, y: 60, width: 55, height: 45 },
    { name: 'Kebbi', x: 140, y: 90, width: 50, height: 40 },
    { name: 'Zamfara', x: 180, y: 100, width: 45, height: 40 },
    { name: 'Katsina', x: 220, y: 80, width: 60, height: 45 },
    { name: 'Jigawa', x: 320, y: 100, width: 50, height: 40 },
    { name: 'Yobe', x: 370, y: 110, width: 55, height: 45 },
    { name: 'Borno', x: 380, y: 140, width: 70, height: 60 },
    { name: 'Adamawa', x: 340, y: 180, width: 60, height: 50 },
    { name: 'Taraba', x: 300, y: 210, width: 55, height: 45 },
    { name: 'Gombe', x: 320, y: 160, width: 45, height: 35 },
    { name: 'Bauchi', x: 290, y: 140, width: 50, height: 40 },
    { name: 'Kogi', x: 200, y: 220, width: 55, height: 45 },
    { name: 'Nasarawa', x: 240, y: 170, width: 40, height: 35 },
    { name: 'Ekiti', x: 140, y: 250, width: 30, height: 25 },
    { name: 'Ondo', x: 150, y: 270, width: 45, height: 35 },
    { name: 'Osun', x: 130, y: 240, width: 35, height: 30 },
    { name: 'Edo', x: 170, y: 260, width: 40, height: 35 },
    { name: 'Akwa Ibom', x: 260, y: 340, width: 45, height: 35 },
    { name: 'Abia', x: 230, y: 300, width: 35, height: 30 },
    { name: 'Enugu', x: 240, y: 250, width: 35, height: 30 },
    { name: 'Ebonyi', x: 260, y: 260, width: 35, height: 30 },
    { name: 'Bayelsa', x: 180, y: 340, width: 40, height: 25 }
  ];

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-slate-300 text-sm">Overstocked ({'>'}70% unsold)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span className="text-slate-300 text-sm">Understocked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-slate-300 text-sm">Balanced</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-slate-500 rounded"></div>
          <span className="text-slate-300 text-sm">No Data</span>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative bg-slate-900/50 rounded-lg p-4" style={{ height: '500px' }}>
        <svg 
          viewBox="0 0 500 400" 
          className="w-full h-full"
          style={{ maxHeight: '450px' }}
        >
          {/* Map Title */}
          <text x="250" y="30" textAnchor="middle" className="fill-white text-lg font-bold">
            Nigeria - Inventory vs Sales Overview
          </text>
          
          {/* Nigerian States */}
          {nigerianStates.map((state) => {
            const stateInfo = stateData.find(s => s.name === state.name);
            return (
              <g key={state.name}>
                {/* State Rectangle */}
                <rect
                  x={state.x}
                  y={state.y}
                  width={state.width}
                  height={state.height}
                  fill={getStateColor(state.name)}
                  opacity={getStateOpacity(state.name)}
                  stroke={selectedState === state.name ? '#FFFFFF' : '#374151'}
                  strokeWidth={selectedState === state.name ? 2 : 1}
                  className="cursor-pointer transition-all duration-200 hover:opacity-100 hover:stroke-white hover:stroke-2"
                  onClick={() => onStateClick(state.name)}
                />
                
                {/* State Label */}
                <text
                  x={state.x + state.width / 2}
                  y={state.y + state.height / 2 + 4}
                  textAnchor="middle"
                  className="fill-white text-xs font-medium pointer-events-none"
                  style={{ fontSize: '10px' }}
                >
                  {state.name}
                </text>
                
                {/* Data indicator for states with information */}
                {stateInfo && (
                  <circle
                    cx={state.x + state.width - 5}
                    cy={state.y + 5}
                    r="3"
                    fill="#FFFFFF"
                    className="pointer-events-none"
                  />
                )}
              </g>
            );
          })}
          
          {/* Compass */}
          <g transform="translate(450, 80)">
            <circle cx="0" cy="0" r="25" fill="#374151" stroke="#64748B" strokeWidth="1"/>
            <text x="0" y="-15" textAnchor="middle" className="fill-white text-xs">N</text>
            <text x="0" y="20" textAnchor="middle" className="fill-white text-xs">S</text>
            <text x="-18" y="5" textAnchor="middle" className="fill-white text-xs">W</text>
            <text x="18" y="5" textAnchor="middle" className="fill-white text-xs">E</text>
            <polygon points="0,-10 -3,5 3,5" fill="#FFFFFF"/>
          </g>
        </svg>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-slate-700/30 border-slate-600">
          <CardContent className="p-4 text-center">
            <p className="text-slate-400 text-sm">Total States with Data</p>
            <p className="text-white text-2xl font-bold">{stateData.length}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-700/30 border-slate-600">
          <CardContent className="p-4 text-center">
            <p className="text-slate-400 text-sm">Overstocked States</p>
            <p className="text-red-400 text-2xl font-bold">
              {stateData.filter(s => s.unsoldPercentage > 70).length}
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-700/30 border-slate-600">
          <CardContent className="p-4 text-center">
            <p className="text-slate-400 text-sm">Balanced States</p>
            <p className="text-green-400 text-2xl font-bold">
              {stateData.filter(s => s.unsoldPercentage <= 70 && s.unitsInStock >= 1000).length}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NigeriaMap;
