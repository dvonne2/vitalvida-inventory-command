
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Brain, Target, Award, RefreshCw, Lightbulb, BarChart, CheckCircle } from 'lucide-react';

interface ImprovementMetric {
  metric: string;
  currentValue: number;
  targetValue: number;
  improvement: number;
  trend: 'up' | 'down' | 'stable';
  priority: 'high' | 'medium' | 'low';
}

interface LearningInsight {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  implementationStatus: 'pending' | 'in_progress' | 'completed';
  confidence: number;
}

const ContinuousImprovementSystem = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'quarter'>('month');
  
  const [metrics] = useState<ImprovementMetric[]>([
    {
      metric: 'Inventory Accuracy',
      currentValue: 87,
      targetValue: 95,
      improvement: 12,
      trend: 'up',
      priority: 'high'
    },
    {
      metric: 'Stockout Prevention',
      currentValue: 92,
      targetValue: 98,
      improvement: 8,
      trend: 'up',
      priority: 'high'
    },
    {
      metric: 'Order Fulfillment Time',
      currentValue: 2.3,
      targetValue: 1.8,
      improvement: -15,
      trend: 'down',
      priority: 'medium'
    },
    {
      metric: 'Cost Efficiency',
      currentValue: 78,
      targetValue: 85,
      improvement: 18,
      trend: 'up',
      priority: 'medium'
    }
  ]);

  const [insights] = useState<LearningInsight[]>([
    {
      id: '1',
      title: 'Seasonal Demand Pattern Detection',
      description: 'AI identified 23% increase in shampoo demand during rainy season. Recommend adjusting buffer stock accordingly.',
      impact: 'high',
      implementationStatus: 'pending',
      confidence: 94
    },
    {
      id: '2',
      title: 'DA Performance Correlation',
      description: 'DAs with higher inventory accuracy show 31% better sales velocity. Suggest focused training program.',
      impact: 'high',
      implementationStatus: 'in_progress',
      confidence: 89
    },
    {
      id: '3',
      title: 'Route Optimization Opportunity',
      description: 'Consolidating Lagos deliveries on Tuesdays and Thursdays could reduce logistics costs by 12%.',
      impact: 'medium',
      implementationStatus: 'completed',
      confidence: 76
    },
    {
      id: '4',
      title: 'Predictive Restock Timing',
      description: 'System learned optimal restock timing reduces emergency orders by 45% and improves cash flow.',
      impact: 'high',
      implementationStatus: 'pending',
      confidence: 92
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '➡️';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-purple-500/20 text-purple-400 border-purple-500';
      case 'medium': return 'bg-blue-500/20 text-blue-400 border-blue-500';
      case 'low': return 'bg-gray-500/20 text-gray-400 border-gray-500';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'in_progress': return 'bg-blue-500/20 text-blue-400';
      case 'completed': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const implementInsight = (insightId: string) => {
    console.log(`Implementing insight: ${insightId}`);
  };

  const avgImprovement = Math.round(metrics.reduce((sum, metric) => sum + Math.abs(metric.improvement), 0) / metrics.length);
  const highImpactInsights = insights.filter(insight => insight.impact === 'high').length;
  const completedInsights = insights.filter(insight => insight.implementationStatus === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Header */}
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
              {['week', 'month', 'quarter'].map((timeframe) => (
                <Button
                  key={timeframe}
                  variant={selectedTimeframe === timeframe ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTimeframe(timeframe as 'week' | 'month' | 'quarter')}
                  className={selectedTimeframe === timeframe ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
                >
                  {timeframe}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Improvement Overview */}
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

      {/* Performance Metrics Tracking */}
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

      {/* AI Learning Insights */}
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
                        onClick={() => implementInsight(insight.id)}
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
    </div>
  );
};

export default ContinuousImprovementSystem;
