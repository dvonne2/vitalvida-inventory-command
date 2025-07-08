
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Lightbulb, CheckCircle, Award } from 'lucide-react';
import { LearningInsight } from './types';

interface ImprovementOverviewProps {
  avgImprovement: number;
  insights: LearningInsight[];
}

const ImprovementOverview = ({ avgImprovement, insights }: ImprovementOverviewProps) => {
  const highImpactInsights = insights.filter(insight => insight.impact === 'high').length;
  const completedInsights = insights.filter(insight => insight.implementationStatus === 'completed').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Avg Improvement</p>
              <p className="text-2xl font-bold text-emerald-400">{avgImprovement}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-emerald-400" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">High Impact Insights</p>
              <p className="text-2xl font-bold text-purple-400">{highImpactInsights}</p>
            </div>
            <Lightbulb className="h-8 w-8 text-purple-400" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Implemented</p>
              <p className="text-2xl font-bold text-green-400">{completedInsights}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Learning Score</p>
              <p className="text-2xl font-bold text-blue-400">A+</p>
            </div>
            <Award className="h-8 w-8 text-blue-400" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImprovementOverview;
