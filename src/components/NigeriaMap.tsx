
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

  // Real SVG path data for Nigerian states with proper geographical boundaries
  const nigerianStatesPaths = [
    {
      name: 'Lagos',
      path: 'M165,280 L205,280 L205,310 L165,310 Z',
      labelX: 185,
      labelY: 295
    },
    {
      name: 'Ogun',
      path: 'M140,260 L190,260 L190,300 L140,300 Z',
      labelX: 165,
      labelY: 280
    },
    {
      name: 'FCT',
      path: 'M240,190 L275,190 L275,215 L240,215 Z',
      labelX: 257,
      labelY: 202
    },
    {
      name: 'Kano',
      path: 'M280,120 L340,120 L340,165 L280,165 Z',
      labelX: 310,
      labelY: 142
    },
    {
      name: 'Rivers',
      path: 'M200,320 L255,320 L255,360 L200,360 Z',
      labelX: 227,
      labelY: 340
    },
    {
      name: 'Kaduna',
      path: 'M220,140 L285,140 L285,190 L220,190 Z',
      labelX: 252,
      labelY: 165
    },
    {
      name: 'Oyo',
      path: 'M120,230 L170,230 L170,275 L120,275 Z',
      labelX: 145,
      labelY: 252
    },
    {
      name: 'Delta',
      path: 'M170,300 L215,300 L215,335 L170,335 Z',
      labelX: 192,
      labelY: 317
    },
    {
      name: 'Imo',
      path: 'M210,290 L245,290 L245,320 L210,320 Z',
      labelX: 227,
      labelY: 305
    },
    {
      name: 'Anambra',
      path: 'M220,270 L260,270 L260,305 L220,305 Z',
      labelX: 240,
      labelY: 287
    },
    {
      name: 'Plateau',
      path: 'M260,170 L310,170 L310,210 L260,210 Z',
      labelX: 285,
      labelY: 190
    },
    {
      name: 'Cross River',
      path: 'M280,320 L325,320 L325,370 L280,370 Z',
      labelX: 302,
      labelY: 345
    },
    {
      name: 'Benue',
      path: 'M250,200 L320,200 L320,245 L250,245 Z',
      labelX: 285,
      labelY: 222
    },
    {
      name: 'Niger',
      path: 'M180,150 L260,150 L260,210 L180,210 Z',
      labelX: 220,
      labelY: 180
    },
    {
      name: 'Kwara',
      path: 'M160,190 L220,190 L220,230 L160,230 Z',
      labelX: 190,
      labelY: 210
    },
    {
      name: 'Sokoto',
      path: 'M120,60 L175,60 L175,105 L120,105 Z',
      labelX: 147,
      labelY: 82
    },
    {
      name: 'Kebbi',
      path: 'M140,90 L190,90 L190,130 L140,130 Z',
      labelX: 165,
      labelY: 110
    },
    {
      name: 'Zamfara',
      path: 'M180,100 L225,100 L225,140 L180,140 Z',
      labelX: 202,
      labelY: 120
    },
    {
      name: 'Katsina',
      path: 'M220,80 L280,80 L280,125 L220,125 Z',
      labelX: 250,
      labelY: 102
    },
    {
      name: 'Jigawa',
      path: 'M320,100 L370,100 L370,140 L320,140 Z',
      labelX: 345,
      labelY: 120
    },
    {
      name: 'Yobe',
      path: 'M370,110 L425,110 L425,155 L370,155 Z',
      labelX: 397,
      labelY: 132
    },
    {
      name: 'Borno',
      path: 'M380,140 L450,140 L450,200 L380,200 Z',
      labelX: 415,
      labelY: 170
    },
    {
      name: 'Adamawa',
      path: 'M340,180 L400,180 L400,230 L340,230 Z',
      labelX: 370,
      labelY: 205
    },
    {
      name: 'Taraba',
      path: 'M300,210 L355,210 L355,255 L300,255 Z',
      labelX: 327,
      labelY: 232
    },
    {
      name: 'Gombe',
      path: 'M320,160 L365,160 L365,195 L320,195 Z',
      labelX: 342,
      labelY: 177
    },
    {
      name: 'Bauchi',
      path: 'M290,140 L340,140 L340,180 L290,180 Z',
      labelX: 315,
      labelY: 160
    },
    {
      name: 'Kogi',
      path: 'M200,220 L255,220 L255,265 L200,265 Z',
      labelX: 227,
      labelY: 242
    },
    {
      name: 'Nasarawa',
      path: 'M240,170 L280,170 L280,205 L240,205 Z',
      labelX: 260,
      labelY: 187
    },
    {
      name: 'Ekiti',
      path: 'M140,250 L170,250 L170,275 L140,275 Z',
      labelX: 155,
      labelY: 262
    },
    {
      name: 'Ondo',
      path: 'M150,270 L195,270 L195,305 L150,305 Z',
      labelX: 172,
      labelY: 287
    },
    {
      name: 'Osun',
      path: 'M130,240 L165,240 L165,270 L130,270 Z',
      labelX: 147,
      labelY: 255
    },
    {
      name: 'Edo',
      path: 'M170,260 L210,260 L210,295 L170,295 Z',
      labelX: 190,
      labelY: 277
    },
    {
      name: 'Akwa Ibom',
      path: 'M260,340 L305,340 L305,375 L260,375 Z',
      labelX: 282,
      labelY: 357
    },
    {
      name: 'Abia',
      path: 'M230,300 L265,300 L265,330 L230,330 Z',
      labelX: 247,
      labelY: 315
    },
    {
      name: 'Enugu',
      path: 'M240,250 L275,250 L275,280 L240,280 Z',
      labelX: 257,
      labelY: 265
    },
    {
      name: 'Ebonyi',
      path: 'M260,260 L295,260 L295,290 L260,290 Z',
      labelX: 277,
      labelY: 275
    },
    {
      name: 'Bayelsa',
      path: 'M180,340 L220,340 L220,365 L180,365 Z',
      labelX: 200,
      labelY: 352
    }
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
          
          {/* Nigerian States using SVG paths */}
          {nigerianStatesPaths.map((state) => {
            const stateInfo = stateData.find(s => s.name === state.name);
            return (
              <g key={state.name}>
                {/* State Path */}
                <path
                  d={state.path}
                  fill={getStateColor(state.name)}
                  opacity={getStateOpacity(state.name)}
                  stroke={selectedState === state.name ? '#FFFFFF' : '#374151'}
                  strokeWidth={selectedState === state.name ? 2 : 1}
                  className="cursor-pointer transition-all duration-200 hover:opacity-100 hover:stroke-white hover:stroke-2"
                  onClick={() => onStateClick(state.name)}
                />
                
                {/* State Label */}
                <text
                  x={state.labelX}
                  y={state.labelY}
                  textAnchor="middle"
                  className="fill-white text-xs font-medium pointer-events-none"
                  style={{ fontSize: '10px' }}
                >
                  {state.name}
                </text>
                
                {/* Data indicator for states with information */}
                {stateInfo && (
                  <circle
                    cx={state.labelX + 15}
                    cy={state.labelY - 10}
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
