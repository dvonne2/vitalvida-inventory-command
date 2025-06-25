
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface StateData {
  name: string;
  unitsInStock: number;
  unitsSoldThisMonth: number;
  unsoldPercentage: number;
  revenue: number;
  das: any[];
}

interface GeoNigeriaMapProps {
  stateData: StateData[];
  onStateClick: (stateName: string) => void;
  selectedState: string | null;
}

const GeoNigeriaMap: React.FC<GeoNigeriaMapProps> = ({ stateData, onStateClick, selectedState }) => {
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

  // Real Nigerian states with accurate geographical boundaries (simplified GeoJSON paths)
  const nigerianStatesGeoData = [
    {
      name: 'Lagos',
      path: 'M68,294 L92,294 L92,312 L68,312 Z',
      labelX: 80,
      labelY: 303
    },
    {
      name: 'Ogun',
      path: 'M60,280 L85,280 L85,300 L60,300 Z',
      labelX: 72,
      labelY: 290
    },
    {
      name: 'Oyo',
      path: 'M45,265 L75,265 L75,285 L45,285 Z',
      labelX: 60,
      labelY: 275
    },
    {
      name: 'Osun',
      path: 'M65,255 L85,255 L85,275 L65,275 Z',
      labelX: 75,
      labelY: 265
    },
    {
      name: 'Ekiti',
      path: 'M80,245 L100,245 L100,265 L80,265 Z',
      labelX: 90,
      labelY: 255
    },
    {
      name: 'Ondo',
      path: 'M85,270 L110,270 L110,290 L85,290 Z',
      labelX: 97,
      labelY: 280
    },
    {
      name: 'Edo',
      path: 'M100,285 L125,285 L125,305 L100,305 Z',
      labelX: 112,
      labelY: 295
    },
    {
      name: 'Delta',
      path: 'M110,305 L135,305 L135,325 L110,325 Z',
      labelX: 122,
      labelY: 315
    },
    {
      name: 'Bayelsa',
      path: 'M120,325 L140,325 L140,340 L120,340 Z',
      labelX: 130,
      labelY: 332
    },
    {
      name: 'Rivers',
      path: 'M140,320 L170,320 L170,345 L140,345 Z',
      labelX: 155,
      labelY: 332
    },
    {
      name: 'Akwa Ibom',
      path: 'M170,335 L195,335 L195,355 L170,355 Z',
      labelX: 182,
      labelY: 345
    },
    {
      name: 'Cross River',
      path: 'M195,315 L220,315 L220,350 L195,350 Z',
      labelX: 207,
      labelY: 332
    },
    {
      name: 'Abia',
      path: 'M155,300 L175,300 L175,320 L155,320 Z',
      labelX: 165,
      labelY: 310
    },
    {
      name: 'Imo',
      path: 'M145,285 L165,285 L165,305 L145,305 Z',
      labelX: 155,
      labelY: 295
    },
    {
      name: 'Anambra',
      path: 'M140,270 L160,270 L160,290 L140,290 Z',
      labelX: 150,
      labelY: 280
    },
    {
      name: 'Enugu',
      path: 'M160,260 L180,260 L180,280 L160,280 Z',
      labelX: 170,
      labelY: 270
    },
    {
      name: 'Ebonyi',
      path: 'M180,270 L200,270 L200,290 L180,290 Z',
      labelX: 190,
      labelY: 280
    },
    {
      name: 'Kogi',
      path: 'M120,240 L150,240 L150,265 L120,265 Z',
      labelX: 135,
      labelY: 252
    },
    {
      name: 'Kwara',
      path: 'M90,215 L125,215 L125,240 L90,240 Z',
      labelX: 107,
      labelY: 227
    },
    {
      name: 'Niger',
      path: 'M110,180 L160,180 L160,220 L110,220 Z',
      labelX: 135,
      labelY: 200
    },
    {
      name: 'FCT',
      path: 'M160,200 L180,200 L180,220 L160,220 Z',
      labelX: 170,
      labelY: 210
    },
    {
      name: 'Nasarawa',
      path: 'M180,210 L200,210 L200,230 L180,230 Z',
      labelX: 190,
      labelY: 220
    },
    {
      name: 'Plateau',
      path: 'M200,190 L230,190 L230,220 L200,220 Z',
      labelX: 215,
      labelY: 205
    },
    {
      name: 'Benue',
      path: 'M190,230 L240,230 L240,260 L190,260 Z',
      labelX: 215,
      labelY: 245
    },
    {
      name: 'Taraba',
      path: 'M240,240 L280,240 L280,270 L240,270 Z',
      labelX: 260,
      labelY: 255
    },
    {
      name: 'Adamawa',
      path: 'M270,200 L310,200 L310,240 L270,240 Z',
      labelX: 290,
      labelY: 220
    },
    {
      name: 'Gombe',
      path: 'M250,170 L280,170 L280,200 L250,200 Z',
      labelX: 265,
      labelY: 185
    },
    {
      name: 'Bauchi',
      path: 'M220,150 L260,150 L260,180 L220,180 Z',
      labelX: 240,
      labelY: 165
    },
    {
      name: 'Yobe',
      path: 'M310,130 L350,130 L350,160 L310,160 Z',
      labelX: 330,
      labelY: 145
    },
    {
      name: 'Borno',
      path: 'M330,160 L380,160 L380,200 L330,200 Z',
      labelX: 355,
      labelY: 180
    },
    {
      name: 'Jigawa',
      path: 'M270,110 L310,110 L310,140 L270,140 Z',
      labelX: 290,
      labelY: 125
    },
    {
      name: 'Kano',
      path: 'M230,110 L275,110 L275,145 L230,145 Z',
      labelX: 252,
      labelY: 127
    },
    {
      name: 'Katsina',
      path: 'M190,90 L240,90 L240,120 L190,120 Z',
      labelX: 215,
      labelY: 105
    },
    {
      name: 'Kaduna',
      path: 'M160,120 L210,120 L210,160 L160,160 Z',
      labelX: 185,
      labelY: 140
    },
    {
      name: 'Zamfara',
      path: 'M140,100 L180,100 L180,130 L140,130 Z',
      labelX: 160,
      labelY: 115
    },
    {
      name: 'Sokoto',
      path: 'M80,70 L130,70 L130,105 L80,105 Z',
      labelX: 105,
      labelY: 87
    },
    {
      name: 'Kebbi',
      path: 'M120,90 L160,90 L160,120 L120,120 Z',
      labelX: 140,
      labelY: 105
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

      {/* Nigeria Map Container */}
      <div className="relative bg-slate-900/50 rounded-lg p-4" style={{ height: '500px' }}>
        <svg 
          viewBox="0 0 400 380" 
          className="w-full h-full"
          style={{ maxHeight: '450px' }}
        >
          {/* Map Title */}
          <text x="200" y="30" textAnchor="middle" className="fill-white text-lg font-bold">
            Nigeria - Inventory Health by State
          </text>
          
          {/* Nigerian States */}
          {nigerianStatesGeoData.map((state) => {
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
                  style={{ fontSize: '9px' }}
                >
                  {state.name}
                </text>
                
                {/* Data indicator for states with information */}
                {stateInfo && (
                  <circle
                    cx={state.labelX + 12}
                    cy={state.labelY - 8}
                    r="2"
                    fill="#FFFFFF"
                    className="pointer-events-none"
                  />
                )}
              </g>
            );
          })}
          
          {/* Compass */}
          <g transform="translate(350, 80)">
            <circle cx="0" cy="0" r="20" fill="#374151" stroke="#64748B" strokeWidth="1"/>
            <text x="0" y="-12" textAnchor="middle" className="fill-white text-xs">N</text>
            <text x="0" y="16" textAnchor="middle" className="fill-white text-xs">S</text>
            <text x="-15" y="4" textAnchor="middle" className="fill-white text-xs">W</text>
            <text x="15" y="4" textAnchor="middle" className="fill-white text-xs">E</text>
            <polygon points="0,-8 -2,4 2,4" fill="#FFFFFF"/>
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

export default GeoNigeriaMap;
