
export interface ImprovementMetric {
  metric: string;
  currentValue: number;
  targetValue: number;
  improvement: number;
  trend: 'up' | 'down' | 'stable';
  priority: 'high' | 'medium' | 'low';
}

export interface LearningInsight {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  implementationStatus: 'pending' | 'in_progress' | 'completed';
  confidence: number;
}

export type TimeframeType = 'week' | 'month' | 'quarter';
