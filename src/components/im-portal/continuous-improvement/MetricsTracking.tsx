
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BarChart, Target } from 'lucide-react';
import { ImprovementMetric } from './types';
import { getTrendIcon, getPriorityColor } from './utils';

interface MetricsTrackingProps {
  metrics: ImprovementMetric[];
}

const MetricsTracking = ({ metrics }: MetricsTrackingProps) => {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white text-lg flex items-center gap-2">
          <BarChart className="h-5 w-5 text-emerald-400" />
          Performance Metrics & Targets
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-slate-700/30 rounded-lg p-4">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-white font-medium">{metric.metric}</h4>
                    <Badge className={getPriorityColor(metric.priority)}>
                      {metric.priority.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getTrendIcon(metric.trend)}</span>
                    <span className={`text-sm font-medium ${metric.improvement > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {metric.improvement > 0 ? '+' : ''}{metric.improvement}%
                    </span>
                  </div>
                </div>
                
                <div>
                  <p className="text-slate-400 text-sm mb-2">Current vs Target</p>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{metric.currentValue}</span>
                    <span className="text-slate-400">/</span>
                    <span className="text-blue-400">{metric.targetValue}</span>
                    <span className="text-slate-400 text-sm">
                      {metric.metric.includes('Time') ? 'hrs' : '%'}
                    </span>
                  </div>
                </div>
                
                <div>
                  <p className="text-slate-400 text-sm mb-2">Progress to Target</p>
                  <Progress 
                    value={metric.metric.includes('Time') 
                      ? ((metric.targetValue / metric.currentValue) * 100)
                      : ((metric.currentValue / metric.targetValue) * 100)
                    } 
                    className="mb-1" 
                  />
                  <p className="text-xs text-slate-400">
                    {Math.round(((metric.currentValue / metric.targetValue) * 100))}% achieved
                  </p>
                </div>
                
                <div>
                  <Button
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white w-full"
                  >
                    <Target className="h-4 w-4 mr-1" />
                    Optimize
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsTracking;
