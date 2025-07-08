
import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';
import { TimeframeType } from './types';

interface ImprovementHeaderProps {
  selectedTimeframe: TimeframeType;
  onTimeframeChange: (timeframe: TimeframeType) => void;
}

const ImprovementHeader = ({ selectedTimeframe, onTimeframeChange }: ImprovementHeaderProps) => {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-3">
            <Brain className="h-6 w-6 text-emerald-400" />
            Continuous Improvement System
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500">
              Self-Learning AI
            </Badge>
          </CardTitle>
          <div className="flex items-center gap-2">
            {(['week', 'month', 'quarter'] as TimeframeType[]).map((timeframe) => (
              <Button
                key={timeframe}
                variant={selectedTimeframe === timeframe ? 'default' : 'outline'}
                size="sm"
                onClick={() => onTimeframeChange(timeframe)}
                className={selectedTimeframe === timeframe ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
              >
                {timeframe}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default ImprovementHeader;
