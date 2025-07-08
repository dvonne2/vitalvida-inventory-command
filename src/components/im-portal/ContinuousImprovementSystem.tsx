
import React, { useState } from 'react';
import ImprovementHeader from './continuous-improvement/ImprovementHeader';
import ImprovementOverview from './continuous-improvement/ImprovementOverview';
import MetricsTracking from './continuous-improvement/MetricsTracking';
import LearningInsights from './continuous-improvement/LearningInsights';
import { ImprovementMetric, LearningInsight, TimeframeType } from './continuous-improvement/types';

const ContinuousImprovementSystem = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeframeType>('month');
  
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
  ]);

  const implementInsight = (insightId: string) => {
    console.log(`Implementing insight: ${insightId}`);
  };

  const avgImprovement = Math.round(metrics.reduce((sum, metric) => sum + Math.abs(metric.improvement), 0) / metrics.length);

  return (
    <div className="space-y-6">
      <ImprovementHeader 
        selectedTimeframe={selectedTimeframe}
        onTimeframeChange={setSelectedTimeframe}
      />
      
      <ImprovementOverview 
        avgImprovement={avgImprovement}
        insights={insights}
      />
      
      <MetricsTracking metrics={metrics} />
      
      <LearningInsights 
        insights={insights}
        onImplementInsight={implementInsight}
      />
    </div>
  );
};

export default ContinuousImprovementSystem;
