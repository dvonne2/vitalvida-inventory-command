
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Lightbulb, RefreshCw } from 'lucide-react';
import { LearningInsight } from './types';
import { getImpactColor, getStatusColor } from './utils';

interface LearningInsightsProps {
  insights: LearningInsight[];
  onImplementInsight: (insightId: string) => void;
}

const LearningInsights = ({ insights, onImplementInsight }: LearningInsightsProps) => {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white text-lg flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-purple-400" />
          AI Learning Insights & Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => (
            <div key={insight.id} className="bg-slate-700/30 rounded-lg p-4">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-white font-medium">{insight.title}</h4>
                    <Badge className={getImpactColor(insight.impact)}>
                      {insight.impact.toUpperCase()} IMPACT
                    </Badge>
                  </div>
                  <p className="text-slate-300 text-sm">{insight.description}</p>
                </div>
                
                <div>
                  <p className="text-slate-400 text-sm mb-2">AI Confidence</p>
                  <div className="flex items-center gap-2">
                    <Progress value={insight.confidence} className="flex-1" />
                    <span className="text-sm font-medium text-blue-400">
                      {insight.confidence}%
                    </span>
                  </div>
                  <div className="mt-2">
                    <Badge className={getStatusColor(insight.implementationStatus)}>
                      {insight.implementationStatus.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  {insight.implementationStatus === 'pending' && (
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={() => onImplementInsight(insight.id)}
                    >
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Implement
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-slate-300 border-slate-600 hover:bg-slate-700"
                  >
                    View Details
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

export default LearningInsights;
