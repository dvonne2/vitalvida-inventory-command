
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Brain, Calendar, AlertCircle, BarChart3 } from 'lucide-react';

interface PredictiveData {
  product: string;
  currentStock: number;
  predictedDemand: number;
  confidence: number;
  seasonalTrend: 'up' | 'down' | 'stable';
  recommendedAction: string;
  forecastPeriod: '7d' | '14d' | '30d';
}

const PredictiveAnalyticsDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '14d' | '30d'>('14d');
  
  const [predictiveData] = useState<PredictiveData[]>([
    {
      product: 'Fulani Shampoo',
      currentStock: 850,
      predictedDemand: 320,
      confidence: 92,
      seasonalTrend: 'up',
      recommendedAction: 'Increase stock by 15%',
      forecastPeriod: '14d'
    },
    {
      product: 'Hydration Tea',
      currentStock: 120,
      predictedDemand: 180,
      confidence: 87,
      seasonalTrend: 'up',
      recommendedAction: 'Critical: Restock needed',
      forecastPeriod: '14d'
    },
    {
      product: 'Hair Pomade',
      currentStock: 45,
      predictedDemand: 65,
      confidence: 78,
      seasonalTrend: 'stable',
      recommendedAction: 'Moderate increase needed',
      forecastPeriod: '14d'
    },
    {
      product: 'Body Lotion',
      currentStock: 680,
      predictedDemand: 340,
      confidence: 95,
      seasonalTrend: 'down',
      recommendedAction: 'Maintain current levels',
      forecastPeriod: '14d'
    }
  ]);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-400';
    if (confidence >= 80) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '➡️';
    }
  };

  const averageConfidence = Math.round(predictiveData.reduce((sum, item) => sum + item.confidence, 0) / predictiveData.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-3">
              <Brain className="h-6 w-6 text-purple-400" />
              AI Predictive Analytics Dashboard
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500">
                Powered by ML
              </Badge>
            </CardTitle>
            <div className="flex items-center gap-2">
              {['7d', '14d', '30d'].map((period) => (
                <Button
                  key={period}
                  variant={selectedPeriod === period ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedPeriod(period as '7d' | '14d' | '30d')}
                  className={selectedPeriod === period ? 'bg-purple-600 hover:bg-purple-700' : ''}
                >
                  {period}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Avg Confidence</p>
                <p className={`text-2xl font-bold ${getConfidenceColor(averageConfidence)}`}>
                  {averageConfidence}%
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Critical Items</p>
                <p className="text-2xl font-bold text-red-400">
                  {predictiveData.filter(item => item.currentStock < item.predictedDemand).length}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Trending Up</p>
                <p className="text-2xl font-bold text-green-400">
                  {predictiveData.filter(item => item.seasonalTrend === 'up').length}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Predictive Analytics Table */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-400" />
            Demand Forecasting & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {predictiveData.map((item, index) => (
              <div key={index} className="bg-slate-700/30 rounded-lg p-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  <div>
                    <h4 className="text-white font-medium mb-2">{item.product}</h4>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-slate-400">Current:</span>
                      <span className="text-white font-medium">{item.currentStock}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-slate-400">Predicted:</span>
                      <span className="text-blue-400 font-medium">{item.predictedDemand}</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-slate-400 text-sm mb-2">AI Confidence</p>
                    <div className="flex items-center gap-2">
                      <Progress value={item.confidence} className="flex-1" />
                      <span className={`text-sm font-medium ${getConfidenceColor(item.confidence)}`}>
                        {item.confidence}%
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-slate-400 text-sm mb-2">Seasonal Trend</p>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getTrendIcon(item.seasonalTrend)}</span>
                      <Badge className={
                        item.seasonalTrend === 'up' ? 'bg-green-500/20 text-green-400 border-green-500' :
                        item.seasonalTrend === 'down' ? 'bg-red-500/20 text-red-400 border-red-500' :
                        'bg-yellow-500/20 text-yellow-400 border-yellow-500'
                      }>
                        {item.seasonalTrend.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-slate-400 text-sm mb-2">Recommendation</p>
                    <p className="text-white text-sm font-medium">{item.recommendedAction}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictiveAnalyticsDashboard;
